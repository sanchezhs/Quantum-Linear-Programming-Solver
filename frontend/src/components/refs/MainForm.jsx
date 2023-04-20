import { useContext, useState } from "react";
import ObjetiveForm from "../objetive/ObjetiveForm";
import ConstraintsList from "../constraint/ConstraintsList";
import CheckRadio from "../objetive/CheckRadio";
import { FormContext } from "../../context/AppContext";
import { ScrollContext } from "../../context/ScrollContext";
import Modal from '../Modal'
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

function MainForm() {
  const {
    objetive,
    constraints,
    radioValue,
    createConstraint,
    setObjetive,
    setConstraints,
    setModalShow,
  } = useContext(FormContext);
  const { thirdRef } = useContext(ScrollContext);
  const [validated, setValidated] = useState(false);


  const host = "http://localhost:8000/index/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const constraintsPost = [];

    if (constraints.length === 0 || objetive === "" || radioValue === "") {
      console.log("invalid form");
      e.stopPropagation();
      setValidated(true);
      return;
    }
    

    constraints.map((constraint) => {
      constraintsPost.push(constraint.value);
    });

    axios
      .post(host, {
        objetive: objetive,
        constraints: constraintsPost,
        radioValue: radioValue,
      })
      .then((response) => {
        console.log(response);
        alert('Success! Check the console for the results.')
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.data.errors);
        setModalShow(true);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setValidated(false);
    setObjetive("");
    setConstraints([{id: 1, value: ''}]);
  };

  return (
    <Form validated={validated}>
      <h3 ref={thirdRef}>QAOA Quantum Solver</h3>
      <ObjetiveForm />
      <CheckRadio />
      <ConstraintsList />
      <ButtonGroup>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => createConstraint()}
        >
          Add Constraint
        </Button>
        <Button variant="outline-primary" type="reset" onClick={handleReset}>
          Clear
        </Button>
        <Button variant="outline-success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </ButtonGroup>
      <Modal header="error" body="error" />
    </Form>
  );
}

export default MainForm;
