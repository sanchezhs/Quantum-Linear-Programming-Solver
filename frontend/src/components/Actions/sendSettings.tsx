import { HOST } from "../Constants/host";
import { State } from "../Slider/Slider";
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
      token: state.token,
    })
    .then((response) => {
      setShowMessage({show: true, error: false});
    })
    .catch((error) => {
        setShowMessage({show: true, error: true});
    });
};
