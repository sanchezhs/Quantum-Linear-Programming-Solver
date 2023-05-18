import { HOST } from "../Constants/host";
import { State } from "../Elements/Slider/Slider";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

/**
 *  Sends the form contents to the backend for processing.
 *  If there are errors, it will show the error modal.
 * @param state 
 * @param showErrorModal 
 */
export const sendSettings = (
  state: State,
  setShowMessage: React.Dispatch<React.SetStateAction<{show: boolean, error: boolean}>>
) => {
  axios
    .post(HOST + "settings/", {
      upperBound: state.upperBound,
      lowerBound: state.lowerBound,
      seed: state.seed,
      depth: state.depth,
      shots: state.shots,
      simulator: state.simulator,
    })
    .then((response) => {
      setShowMessage({show: true, error: false});
    })
    .catch((error) => {
        setShowMessage({show: true, error: true});
        alert("Error! Check the console for details.");
        console.log(error);
    });
};