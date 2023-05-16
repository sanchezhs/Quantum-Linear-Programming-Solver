import { InputSolution } from "../../context/AppContext";
import { HOST } from "../Constants/host";
import { State, Constraint, setFormState } from '../../pages/input/types/types'
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

/**
 *  Sends the form contents to the backend for processing.
 *  If there are errors, it will show the error modal.
 * @param state 
 * @param constraints 
 * @param setFormState 
 * @param setWaiting 
 * @param showErrorModal 
 * @param setSolution 
 */
export const sendForm = (
  state: State,
  constraints: Constraint[],
  setFormState: setFormState,
  setWaiting: (waiting: boolean) => void,
  showErrorModal: (errors: string[]) => void,
  setInputSolution: (solution: InputSolution) => void
) => {
  const constraintsPost = constraints.map((constraint) => constraint.value);
  axios
    .post(HOST + "index/", {
      objetive: state.objetive,
      constraints: constraintsPost,
      radioValue: state.radioValue,
      upperBound: state.upperBound,
      lowerBound: state.lowerBound,
      seed: state.seed,
      p: state.p,
    })
    .then((response) => {
      setWaiting(false);
      setFormState({ submitted: false, validated: false });
      setInputSolution(response.data);
      alert("Success! Check the console for the results.");
    })
    .catch((error) => {
      console.log('ERROR: ', error.response.data.errors);
      setWaiting(false);
      setFormState({ submitted: false, validated: false });
      showErrorModal([
        error.response.data.errors.objetive,
        error.response.data.errors.constraints,
        //error.response.data.errors,
      ]);
    });
};
