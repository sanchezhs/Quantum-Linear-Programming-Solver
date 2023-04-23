import { HOST } from '../Constants/host'
import axios from "axios";

export const sendToken = (apiToken, setBackends, setSubmitted, setWaiting, showErrorModal) => {
    setSubmitted(true);
    setWaiting(true);
    setBackends([]);
    axios
    .post(HOST+"ibm/", {
      apiToken: apiToken,
    })
    .then((response) => {
      alert("Success! Check the console for the results.");
      response.data.backends.forEach((backend) => {
        setBackends((prevBackends) => [
          ...prevBackends,
          {
            name: backend.name,
            qubits: backend.num_qubits,
            is_simulator: backend.is_simulator,
            operational: backend.operational,
            pending_jobs: backend.pending_jobs,
            status_msg: backend.status_msg,
          },
        ]);
      setSubmitted(false);
      setWaiting(false);
      });
    })
    .catch((error) => {
      console.log('Token error: ', error.response.data.errors);
      showErrorModal([error.response.data.errors]);
      setSubmitted(false);
      setWaiting(false);
    });
}



