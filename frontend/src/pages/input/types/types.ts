import { UPPERBOUND, LOWERBOUND } from "../../../components/Constants/index";

/**
 * Types for the input page
 */
export type State = {
  objetive: string;
  radioValue: string;
  upperBound: string;
  lowerBound: string;
  seed: string;
  p: string;
};

/**
 * Initial state for the input page
 */
export const initialState: State = {
  objetive: "",
  radioValue: "",
  upperBound: UPPERBOUND,
  lowerBound: LOWERBOUND,
  seed: String((Math.random() * (9999 - 0 + 1)) << 0),
  p: "1",
};

/**
 * Actions for the input page
 */
export type Action =
  | { type: "setObjetive"; payload: string }
  | { type: "setRadioValue"; payload: string }
  | { type: "setUpperBound"; payload: string }
  | { type: "setLowerBound"; payload: string }
  | { type: "setSeed"; payload: string }
  | { type: "setDepth"; payload: string };

/**
 * Reducer for the input page
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
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

/**
 * Types for the form
 * Control the submit button 
 * and the Bootstrap class for the Form
 */
export type FormState = {
    submitted: boolean;
    validated: boolean;
}

/**
 * Type for the function
 * that controls the state of the submit button
 */ 
export type setFormState = React.Dispatch<
React.SetStateAction<FormState>
>;

/**
 * Types for the constraints
 */
export type Constraint = {
  id: number;
  value: string;
};

/**
 *  Actions for the constraints
 */
export type ConstraintAction =
  | { type: "createConstraint" }
  | { type: "deleteConstraint"; payload: number }
  | { type: "updateConstraints"; payload: Constraint[] };
