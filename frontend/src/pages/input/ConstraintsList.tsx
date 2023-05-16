import { Constraint as ConstraintElement } from "./index";
import Form from "react-bootstrap/Form";
import { useContext, useReducer, useState } from "react";
import { AppContext } from "../../context/index";
import Buttons from "./Buttons";
import { sendForm } from "../../components/Actions/index";
import { State, Action, Constraint, ConstraintAction, FormState, setFormState } from "./types/types";


export function checkForm(
  constraints: any,
  state: State,
  setFormState: any
) {
  let ok = true;
  if (state.objetive === "") {
    ok = false;
  }

  if (state.radioValue === "") {
    ok = false;
  }

  if (constraints.length === 0) {
    ok = false;
  }

  if (constraints.find((constraint: any) => constraint.value === "")) {
    ok = false;
  }
  if (!ok) setFormState({ submitted: false, validated: true });
  return ok;
}

export function ConstraintsList({
  formState,
  setFormState,
  state,
  dispatch,
}: {
  formState: FormState;
  setFormState: setFormState
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const [waiting, setWaiting] = useState(false);
  const { showErrorModal, setInputSolution } = useContext(AppContext);
  const [constraints, ListDispatch] = useReducer(
    (constraints: Constraint[], action: ConstraintAction) => {
      switch (action.type) {
        case "createConstraint":
          return [
            ...constraints,
            {
              id:
                constraints.length > 0
                  ? constraints[constraints.length - 1].id + 1
                  : 1,
              value: "",
            },
          ];
        case "deleteConstraint":
          return constraints.filter(
            (constraint) => constraint.id !== action.payload
          );
        case "updateConstraints":
          return action.payload;

        default:
          return constraints;
      }
    },
    [{ id: 1, value: "" }]
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setWaiting(true);
    setFormState({ submitted: true, validated: true });
    if (!checkForm(constraints, state, setFormState)) {
      setWaiting(false);
      return;
    }
    sendForm(
      state,
      constraints,
      setFormState,
      setWaiting,
      showErrorModal,
      setInputSolution
    );
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setFormState({ submitted: false, validated: false });
    dispatch({ type: "setObjetive", payload: "" });
    const cleared = constraints.map((constraint) => {
      constraint.value = "";
      return constraint;
    });
    ListDispatch({ type: "updateConstraints", payload: cleared });
    setWaiting(false);
  };

  return (
    <div>
      {constraints.length > 0 && <Form.Label>Subject to:</Form.Label>}
      {constraints.map((constraint) => (
        <ConstraintElement
          key={constraint.id}
          constraints={constraints}
          constraint={constraint}
          dispatch={ListDispatch}
        />
      ))}
      <Buttons
        waiting={waiting}
        setWaiting={setWaiting}
        formState={formState}
        setFormState={setFormState}
        dispatch={ListDispatch}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    </div>
  );
}
