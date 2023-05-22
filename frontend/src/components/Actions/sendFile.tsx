import { FileSolution } from "../../context/AppContext";
import { HOST } from "../Constants/host";
import axios from "axios";

/**
 *  Sends the file contents to the backend for processing.
 *  If there are errors, it will show the error modal.
 * @param fileContents 
 * @param showErrorModal 
 */
export const sendFile = (
  fileContents: string,
  showErrorModal: (errors: string[]) => void,
  setFileSolution: (fileSolution: FileSolution) => void,
  setShowWaiting: (showWaiting: boolean) => void
) => {
  axios
    .post(HOST + "upload/", {
      fileContents: fileContents,
    })
    .then((response) => {
      setFileSolution(response.data);
      alert("Success! Check the console for the results.");
    })
    .catch((error) => {
      if (error.response.data.infeasible) {
        showErrorModal([
          'The problem is infeasible.',
          'Try changing the constraints or the objetive.'
        ]);
      } else if (error.response.data.file_error) {
        showErrorModal([
          error.response.data.file_error
        ]);
      } else {
        showErrorModal([
          'There was and error, here are some things you can check:',
          '1. Check that the objetive is correct.',
          '2. Check that the constraints are correct.',
          '3. Check that the token is correct.',
        ]);
      }
      setShowWaiting(false);
    });
};
