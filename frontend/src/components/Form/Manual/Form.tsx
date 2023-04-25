import { useContext, useReducer, useState } from "react";
import { Objetive, CheckRadio, ConstraintsList } from "./index";
import { AppContext, ScrollContext } from "../../../context/index";
import Buttons from "./Buttons";
import { Modal } from "../../Elements/index";
import { Form, ButtonGroup, Button } from "react-bootstrap";
import { sendForm } from "../../Actions/index";
import Solution from "../../Feedback/Solution";

export type State = {
  objetive: string;
  radioValue: string;
};

const initialState: State = {
  objetive: "",
  radioValue: "",
};

type Action =
  | { type: "setObjetive"; payload: string }
  | { type: "setRadioValue"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setObjetive":
      return { ...state, objetive: action.payload };
    case "setRadioValue":
      return { ...state, radioValue: action.payload };
  }
}

type formStateType = {
  submitted?: boolean;
  validated?: boolean;
  error?: boolean;
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
  const [formState, setFormState] = useState<formStateType>({
    submitted: false,
    validated: false,
  });

  const { thirdRef } = useContext(ScrollContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormState({ submitted: true, validated: true });
    if (
      constraints.length === 0 ||
      state.objetive === "" ||
      state.radioValue === "" ||
      constraints.find((constraint) => constraint.value === "")
    ) {
      setFormState({ submitted: false, validated: true });
      return;
    }
    sendForm(state, constraints, setFormState, showErrorModal, setSolution);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setFormState({ submitted: false, validated: false });
    dispatch({ type: "setObjetive", payload: "" });
    setConstraints([{ id: 1, value: "" }]);
  };

  return (
    <>
      <Form validated={formState.validated}>
        <h3 ref={thirdRef}>Solver</h3>
        <Objetive state={state} dispatch={dispatch} />
        <CheckRadio dispatch={dispatch} />
        <ConstraintsList />
        <Buttons
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
