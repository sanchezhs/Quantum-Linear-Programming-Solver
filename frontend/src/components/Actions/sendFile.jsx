import { HOST } from "../Constants/host";
import axios from "axios";

export const sendFile = (fileContents, showErrorModal) => {
    axios
      .post(HOST+"upload/", {
        fileContents: fileContents,
      })
      .then((response) => {
        console.log(response);
        alert("Success! Check the console for the results.");
      })
      .catch((error) => {
        console.log(error.response.data);
        showErrorModal([error.response.data.errors]);
      });
  };
