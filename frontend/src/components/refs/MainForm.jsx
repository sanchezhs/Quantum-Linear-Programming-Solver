import { useContext, useState } from "react";
import ObjetiveForm from "../objetive/ObjetiveForm";
import ConstraintsList from "../constraint/ConstraintsList";
import CheckRadio from "../objetive/CheckRadio";
import { AppContext } from "../../context/AppContext";
import { ScrollContext } from "../../context/ScrollContext";
import Modal from "../feedback/Modal";
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
    showErrorModal,
  } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const { thirdRef } = useContext(ScrollContext);

  const host = "http://localhost:8000/index/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (constraints.length === 0 || objetive === "" || radioValue === "") {
      console.log("invalid form");
      alert("Invalid form, check the fields. Constraints can't be empty.");
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const constraintsPost = constraints.map((constraint) => constraint.value);

    axios
      .post(host, {
        objetive: objetive,
        constraints: constraintsPost,
        radioValue: radioValue,
      })
      .then((response) => {
        console.log(response);
        alert("Success! Check the console for the results.");
      })
      .catch((error) => {
        console.log(error.response.data.errors.objetive);
        console.log(error.response.data.errors.constraints);
        showErrorModal(error);
        setValidated(false);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setValidated(false);
    setObjetive("");
    setConstraints([{ id: 1, value: "" }]);
  };

  return (
    <Form validated={validated}>
      <h3 ref={thirdRef}>Solver</h3>
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
