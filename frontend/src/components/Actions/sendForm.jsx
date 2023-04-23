import { HOST } from "../Constants/host";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export const sendForm = (
  objetive,
  constraints,
  radioValue,
  dispatch,
  showErrorModal,
  setSolution
) => {
  const constraintsPost = constraints.map((constraint) => constraint.value);
  axios
    .post(HOST + "index/", {
      objetive: objetive,
      constraints: constraintsPost,
      radioValue: radioValue,
    })
    .then((response) => {
      dispatch({ type: "reset_submit" });
      console.log(response.data);
      setSolution(response.data);
      alert("Success! Check the console for the results.");
    })
    .catch((error) => {
      dispatch({ type: "reset_submit" });
      dispatch({ type: "invalidate" });
      showErrorModal([
        error.response.data.errors.objetive,
        error.response.data.errors.constraints,
      ]);
    });
};
