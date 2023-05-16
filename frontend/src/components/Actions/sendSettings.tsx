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
) => {
  axios
    .post(HOST + "settings/", {
      upperBound: state.upperBound,
      lowerBound: state.lowerBound,
      seed: state.seed,
      depth: state.depth,
      backend: state.backend,
    })
    .then((response) => {
      alert("Success! Check the console for the results.");
    })
    .catch((error) => {
        alert("Error! Check the console for details.");
        console.log(error);
    });
};
