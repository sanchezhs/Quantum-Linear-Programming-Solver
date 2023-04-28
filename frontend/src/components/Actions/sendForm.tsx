import { HOST } from "../Constants/host";
import type { State } from "../Form/Input/Form";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export const sendForm = (
  state: State,
  constraints: { id: number; value: string }[],
  setFormState: (state: { submitted: boolean; validated: boolean }) => void,
  showErrorModal: (errors: string[]) => void,
  setSolution: (solution: string) => void
) => {
  const constraintsPost = constraints.map((constraint) => constraint.value);
  axios
    .post(HOST + "index/", {
      objetive: state.objetive,
      constraints: constraintsPost,
      radioValue: state.radioValue,
    })
    .then((response) => {
      setFormState({ submitted: false, validated: false });
      console.log(response.data);
      setSolution(response.data);
      alert("Success! Check the console for the results.");
    })
    .catch((error) => {
      setFormState({ submitted: false, validated: false });
      showErrorModal([
        error.response.data.errors.objetive,
        error.response.data.errors.constraints,
      ]);
    });
};
