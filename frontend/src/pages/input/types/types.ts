import { UPPERBOUND, LOWERBOUND } from "../../../components/Constants/index";

/**
 * Types for the Solver form
 */
export type State = {
  objetive: string;
  radioValue: string;
};

/**
 * Initial state for the Solver form
 */
export const initialState: State = {
  objetive: "",
  radioValue: "",
};

/**
 * Actions for the Solver form
 */
export type Action =
  | { type: "setObjetive"; payload: string }
  | { type: "setRadioValue"; payload: string }

/**
 * Reducer for the Solver form
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setObjetive":
      return { ...state, objetive: action.payload };
    case "setRadioValue":
      return { ...state, radioValue: action.payload };
    default:
      return state;
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
export type TConstraint = {
  id: number;
  value: string;
};

/**
 *  Actions for the constraints
 */
export type ConstraintAction =
  | { type: "createConstraint" }
  | { type: "deleteConstraint"; payload: number }
  | { type: "updateConstraints"; payload: TConstraint[] };
