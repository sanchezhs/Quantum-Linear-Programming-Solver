import { useContext, useReducer, useState } from "react";
import { ConstraintsList } from "./index";
import { AppContext } from "../../../context/index";
import Buttons from "./Buttons";
import { sendForm } from "../../Actions/index";
import { Action, checkForm } from "./Form";

export type State = {
  objetive: string;
  radioValue: string;
  upperBound: string;
  p: string;
};

export type ConstraintType = {
  id: number;
  value: string;
};

export type ConstraintAction =
  | { type: "createConstraint"; payload: ConstraintType }
  | { type: "deleteConstraint"; payload: number }
  | { type: "updateConstraints"; payload: ConstraintType[] };



export function Logic({ formState, setFormState, state, dispatch }:
    { formState: { submitted: boolean; validated: boolean };
        setFormState: React.Dispatch<
            React.SetStateAction<{ submitted: boolean; validated: boolean }>
        >;
        state: State;
        dispatch: React.Dispatch<Action>;
    }

    ) {
  const [waiting, setWaiting] = useState(false);

  const [constraints, ListDispatch] = useReducer(
    (constraints: ConstraintType[], action: ConstraintAction) => {
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
  const { showErrorModal, setSolution } = useContext(AppContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setWaiting(true);
    setFormState({ submitted: true, validated: true });
    if (!checkForm(constraints, state, setFormState)) {
        setWaiting(false);
        return
    };
    sendForm(
      state,
      constraints,
      setFormState,
      setWaiting,
      showErrorModal,
      setSolution
    );
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setFormState({ submitted: false, validated: false });
    dispatch({ type: "setObjetive", payload: "" });
    dispatch({ type: "setUpperBound", payload: "10" });
    //setConstraints([{ id: 1, value: "" }]);
    const cleared = constraints.map((constraint) => {
      constraint.value = "";
      return constraint;
    });
    ListDispatch({ type: "updateConstraints", payload: cleared });
    setWaiting(false);
  };

  return (
    <>
      <ConstraintsList constraints={constraints} dispatch={ListDispatch} />
      <Buttons
        waiting={waiting}
        setWaiting={setWaiting}
        formState={formState}
        dispatch={ListDispatch}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    </>
  );
}
