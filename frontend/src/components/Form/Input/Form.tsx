import { useContext, useReducer, useState } from "react";
import { Objetive, CheckRadio, ConstraintsList, UpperBound, Approximation } from "./index";
import { AppContext, ScrollContext } from "../../../context/index";
import { UPPERBOUND } from '../../Constants/index'
import Buttons from "./Buttons";
import { Modal } from "../../Elements/index";
import { Form, Row, Col } from "react-bootstrap";
import { sendForm } from "../../Actions/index";
import { Solution } from "../../Solution/index";

export type State = {
  objetive: string;
  radioValue: string;
  upperBound: string;
  p: string;
};

const initialState: State = {
  objetive: "",
  radioValue: "",
  upperBound: UPPERBOUND,
  p: "1",
};

export type Action =
  | { type: "setObjetive"; payload: string }
  | { type: "setRadioValue"; payload: string }
  | { type: "setUpperBound"; payload: string }
  | { type: "setP"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setObjetive":
      return { ...state, objetive: action.payload };
    case "setRadioValue":
      return { ...state, radioValue: action.payload };
    case "setUpperBound":
      return { ...state, upperBound: action.payload };
    case "setP":
      return { ...state, p: action.payload };
  }
}

function checkForm(constraints: any, state: State, setFormState: any) {
  if (
    constraints.length === 0 ||
    state.objetive === "" ||
    state.radioValue === "" ||
    constraints.find((constraint: any) => constraint.value === "")
  ) {
    setFormState({ submitted: false, validated: true });
    return false;
  } 
  return true;
}

export function MainForm() {
  const {
    constraints,
    createConstraint,
    setConstraints,
    setSolution,
    showErrorModal,
  } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [waiting, setWaiting] = useState(false);
  const [formState, setFormState] = useState({
    submitted: false,
    validated: false,
  });

  const { thirdRef } = useContext(ScrollContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setWaiting(true);
    setFormState({ submitted: true, validated: true });
    if (! checkForm(constraints, state, setFormState)) return;
    sendForm(state, constraints, setFormState, setWaiting, showErrorModal, setSolution);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setFormState({ submitted: false, validated: false });
    dispatch({ type: "setObjetive", payload: "" });
    dispatch({ type: "setUpperBound", payload: "" });
    setConstraints([{ id: 1, value: "" }]);
    setWaiting(false);
  };

  return (
    <>
      <Form validated={formState.validated}>
        <h3 ref={thirdRef}>Solver</h3>
        <Objetive state={state} dispatch={dispatch} />
        <Row id="modal-row">
          <Col>
            <CheckRadio dispatch={dispatch} />
          </Col>
          <Col>
            <UpperBound state={state} dispatch={dispatch}/>
          </Col>
          <Col>
            <Approximation state={state} dispatch={dispatch}/>
          </Col>
        </Row>
        <ConstraintsList />
        <Buttons
          waiting={waiting}
          setWaiting={setWaiting}
          formState={formState}
          createConstraint={createConstraint}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
        <Modal />
      </Form>
      <Solution />
    </>
  );
}
