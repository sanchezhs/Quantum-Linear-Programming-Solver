import { useContext } from "react";
import ObjetiveForm from "./objetive/ObjetiveForm";
import ConstraintsList from "./constraint/ConstraintsList";
import CheckRadio from "./objetive/CheckRadio";
import { FormContext } from "../context/FormContext";
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
  } = useContext(FormContext);

  const host = "http://localhost:8000/index/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const constraintsPost = []
    constraints.map((constraint) => {
      constraintsPost.push(
        constraint.value,
      );
    });

    axios
      .post(host, {
        objetive: objetive,
        constraints: constraintsPost,
        radioValue: radioValue,
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setObjetive("");
    setConstraints([]);
  };

  return (
    <Form>
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
    </Form>
  );
}

export default MainForm;
