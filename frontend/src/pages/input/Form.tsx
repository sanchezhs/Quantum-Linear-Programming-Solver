import { useContext, useReducer, useState } from "react";
import { Form } from "react-bootstrap";
import { Objetive, CheckRadio, Bounds, Depth, ConstraintsList, Seed } from "./index";
import { AppContext } from "../../context/index";
import { InputSolTab } from "../../components/Solution/index";
import { reducer, initialState, FormState } from "./types/types";


export function MainForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formState, setFormState] = useState<FormState>({
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
