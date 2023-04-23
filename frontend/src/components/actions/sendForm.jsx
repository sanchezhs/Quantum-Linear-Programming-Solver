import HOST from '../constants/host'

export const postToken = (objetive, constraints, radioValue) => {
    const constraintsPost = constraints.map((constraint) => constraint.value);
    axios
    .post(HOST+"index/", {
      objetive: objetive,
      constraints: constraintsPost,
      radioValue: radioValue,
    })
    .then((response) => {
      setSubmitted(false);
      console.log(response.data);
      alert("Success! Check the console for the results.");
    })
    .catch((error) => {
      setSubmitted(false);
      showErrorModal([
        error.response.data.errors.objetive,
        error.response.data.errors.constraints,
      ]);
      setValidated(false);
    });
};

