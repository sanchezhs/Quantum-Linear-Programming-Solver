import { useContext, useReducer, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { Objetive, CheckRadio, ConstraintsList } from "./index";
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
              <Container>
              <Objetive state={state} dispatch={dispatch} />
              <CheckRadio dispatch={dispatch} />
              <ConstraintsList
                formState={formState}
                setFormState={setFormState}
                state={state}
                dispatch={dispatch}
              />
            </Container>
        </Form>
        {inputSolution && <InputSolTab inputSolution={inputSolution} />}
      </section>
    </>
  );
}
