import { useContext, useReducer } from "react";
import ObjetiveForm from "../Objetive/ObjetiveForm";
import ConstraintsList from "../Constraints/ConstraintsList";
import CheckRadio from "../Objetive/CheckRadio";
import { AppContext } from "../../context/AppContext";
import { ScrollContext } from "../../context/ScrollContext";
import Modal from "../Feedback/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import { sendForm } from "../Actions/sendForm";
import Solution from '../Feedback/Solution'

const initialState = {
  validated: false,
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "validate":
      return { ...state, validated: true };
    case "invalidate":
      return { ...state, validated: false };
    case "reset_submit":
      return { ...state, submitted: false };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return { ...state, validated: false, submitted: false };
    default:
      throw new Error();
  }
}

function MainForm() {
  const {
    objetive,
    constraints,
    radioValue,
    createConstraint,
    setObjetive,
    setConstraints,
    setSolution,
    showErrorModal,
  } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { thirdRef } = useContext(ScrollContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "submit" });
    if (constraints.length === 0 || objetive === "" || radioValue === "") {
      dispatch({ type: "validate" });
      dispatch({ type: "reset_submit" });
      return;
    }
    sendForm(objetive, constraints, radioValue, dispatch, showErrorModal, setSolution);
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch({ type: "reset" });
    setObjetive("");
    setConstraints([{ id: 1, value: "" }]);
  };

  return (
    <>
      <Form validated={state.validated}>
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
          <Button
            variant="outline-success"
            type="submit"
            disabled={state.submitted}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ButtonGroup>
        <Modal header="error" body="error" />
      </Form>
      <Solution />
    </>
  );
}

export default MainForm;
