import { HOST } from "../Constants/host";
import axios from "axios";
import type { Backend } from "../../context/AppContext";
import { Action, ActionType } from "../Form/Ibm/Form";


/**
 * Sends the token to the backend for processing.
 * If there are errors, it will show the error modal.
 * @param apiToken 
 * @param setBackends 
 * @param dispatch 
 * @param showErrorModal 
 */
export const sendToken = (
  apiToken: string,
  setBackends: (backends: Backend[]) => void,
  dispatch: (action: Action) => void,
  showErrorModal: (errors: string[]) => void
) => {
  dispatch({ type: ActionType.SetSubmitted, payload: true });
  dispatch({ type: ActionType.SetWaiting, payload: true });
  setBackends([]);
  axios
    .post(HOST + "ibm/", {
      apiToken: apiToken,
    })
    .then((response) => {
      alert("Success! Check the console for the results.");
      const responseBackends = response.data.backends;
      const backends: Backend[] = [];
      responseBackends.forEach((backend: Backend) => {
        backends.push({
          name: backend.name,
          num_qubits: backend.num_qubits,
          is_simulator: backend.is_simulator,
          operational: backend.operational,
          pending_jobs: backend.pending_jobs,
          status_msg: backend.status_msg,
        });
      });
      setBackends(backends); 
      dispatch({ type: ActionType.SetSubmitted, payload: false });
      dispatch({ type: ActionType.SetWaiting, payload: false });
    })
    .catch((error) => {
      if (!error.response) {
        alert("Network error");
      }
      console.log("Token error: ", error.response.data.errors);
      showErrorModal([error.response.data.errors]);
      dispatch({ type: ActionType.SetSubmitted, payload: false });
      dispatch({ type: ActionType.SetWaiting, payload: false });
    });
};
