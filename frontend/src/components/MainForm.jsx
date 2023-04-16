import { useContext } from "react";
import ObjetiveForm from "./objetive/ObjetiveForm";
import ConstraintsList from "./constraint/ConstraintsList";
import CheckRadio from './objetive/CheckRadio'
import { FormContext } from "../context/FormContext";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

function MainForm() {
  const { createConstraint, setObjetive, setConstraints } =
    useContext(FormContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // enviar objetive
    // enviar constraints
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
      <ButtonGroup aria-label="Basic example">
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
        <Button variant="outline-success" type="submit">
          Submit
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default MainForm;
