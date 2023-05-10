import { useContext, useReducer, useState } from "react";
import { Objetive, CheckRadio, UpperBound, Approximation, Logic } from "./index";
import { AppContext, ScrollContext } from "../../../context/index";
import { UPPERBOUND } from "../../Constants/index";
import { Modal } from "../../Elements/index";
import { Form, Row, Col } from "react-bootstrap";
import { InputSolTab } from "../../Solution/index";

export type State = {
  objetive: string;
  radioValue: string;
  upperBound: string;
  p: string;
};

export const initialState: State = {
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

export function reducer(state: State, action: Action): State {
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

export function checkForm(constraints: any, state: State, setFormState: any) {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formState, setFormState] = useState({
    submitted: false,
    validated: false,
  });

  const { thirdRef } = useContext(ScrollContext);
  const { inputSolution } = useContext(AppContext);
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
            <UpperBound state={state} dispatch={dispatch} />
          </Col>
          <Col>
            <Approximation state={state} dispatch={dispatch} />
          </Col>
        </Row>
        <Logic
          formState={formState}
          setFormState={setFormState}
          state={state}
          dispatch={dispatch}
        />
        <Modal />
      </Form>
      {inputSolution && <InputSolTab inputSolution={inputSolution} />}
    </>
  );
}
