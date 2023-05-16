import { useContext, useReducer, useState } from "react";
import { Objetive, CheckRadio, Bounds, Depth, ConstraintsList, Seed } from "./index";
import { AppContext } from "../../context/index";
import { UPPERBOUND, LOWERBOUND } from "../../components/Constants/index";
import { Form } from "react-bootstrap";
import { InputSolTab } from "../../components/Solution/index";

export type State = {
  objetive: string;
  radioValue: string;
  upperBound: string;
  lowerBound: string;
  seed: string;
  p: string;
};

export const initialState: State = {
  objetive: "",
  radioValue: "",
  upperBound: UPPERBOUND,
  lowerBound: LOWERBOUND,
  seed: String((Math.random() * (9999 - 0 + 1)) << 0),
  p: "1",
};

export type Action =
  | { type: "setObjetive"; payload: string }
  | { type: "setRadioValue"; payload: string }
  | { type: "setUpperBound"; payload: string }
  | { type: "setLowerBound"; payload: string }
  | { type: "setSeed"; payload: string }
  | { type: "setDepth"; payload: string };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setObjetive":
      return { ...state, objetive: action.payload };
    case "setRadioValue":
      return { ...state, radioValue: action.payload };
    case "setUpperBound":
      return { ...state, upperBound: action.payload };
    case "setLowerBound":
      return { ...state, lowerBound: action.payload };
    case "setSeed":
      return { ...state, seed: action.payload };
    case "setDepth":
      return { ...state, p: action.payload };
  }
}

export function checkForm(showErrorModal: (message: string[]) => void, constraints: any, state: State, setFormState: any) {
  
  let ok = true;
  if (state.lowerBound === "0" && state.upperBound === "0") {
    showErrorModal(["Lower and Upper bounds can't be 0 at the same time!"]);
    ok = false;
  }
  
  if (constraints.length === 0) {
    showErrorModal(["You must add at least one constraint!"]);
    ok = false;
  }

  if (state.objetive === "" ) {
    showErrorModal(["You must add an objetive function!"]);
    ok = false;
  }

  if (state.radioValue === "") {
    showErrorModal(["You must select an optimization sense!"]);
    ok = false;
  }

  if (constraints.find((constraint: any) => constraint.value === "")) {
    showErrorModal(["You must fill all the constraints!"]);
    ok = false;
  }
  if (!ok)
    setFormState({ submitted: false, validated: false });
  return ok;
}

export function MainForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formState, setFormState] = useState({
    submitted: false,
    validated: false,
  });

  const { inputSolution } = useContext(AppContext);
  return (
    <>
      <section id="content-section" className="container">
        <Form validated={formState.validated}>
          <h3>Solver</h3>
          <div className="container" style={{ width: "100%", overflow: "hidden" }}>
            <div id="modal-row" style={{  width: "50%", float: "left" }}>
              <Objetive state={state} dispatch={dispatch} />
              <CheckRadio dispatch={dispatch} />
              <ConstraintsList
                formState={formState}
                setFormState={setFormState}
                state={state}
                dispatch={dispatch}
              />
            </div>
            <div style={{  float: "right" }}>
              <h5>Problem Parameters</h5>
              <Bounds state={state} dispatch={dispatch} />
              <h5>Optimization Parameters</h5>
              <Depth state={state} dispatch={dispatch} />
              <Seed state={state} dispatch={dispatch} />
            </div>
          </div>
        </Form>
        {inputSolution && <InputSolTab inputSolution={inputSolution} />}
      </section>
    </>
  );
}
