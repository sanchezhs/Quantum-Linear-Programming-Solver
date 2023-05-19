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
      if (error.response.data.errors.token !== undefined) {
        showErrorModal([error.response.data.errors.token]);
      } else {
      showErrorModal([
        error.response.data.errors
      ]);

    }
      setShowWaiting(false);
    });
};
