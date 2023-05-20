import { InputSolution } from "../../context/AppContext";
import { HOST } from "../Constants/host";
import { State, TConstraint, setFormState } from '../../pages/input/types/types'
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
  constraints: TConstraint[],
  setFormState: setFormState,
  setWaiting: (waiting: boolean) => void,
  showErrorModal: (errors: string[]) => void,
  setInputSolution: (solution: InputSolution) => void
) => {
  const constraintsPost = constraints.map((constraint) => constraint.value);
  axios
    .post(HOST + "input/", {
      objetive: state.objetive,
      constraints: constraintsPost,
      radioValue: state.radioValue,
    })
    .then((response) => {
      alert("Success! Check the console for the results.");
      setWaiting(false);
      setFormState({ submitted: false, validated: false });
      setInputSolution(response.data);
    })
    .catch((error) => {
      showErrorModal([
        'There was and error, here are some things you can check:',
        '1. Check that the objetive is correct.',
        '2. Check that the constraints are correct.',
        '3. Check that the token is correct.',
      ]);
      setWaiting(false);
      setFormState({ submitted: false, validated: false });
    });
};
