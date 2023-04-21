import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AppContext } from "../../context/AppContext";
import axios from "axios";


function IBM() {
  const { apiToken, setApiToken } = useContext(AppContext);
  const host = "http://localhost:8000/ibm/";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(apiToken)
    axios.post(host, {
        apiToken: apiToken,
        })
        .then((response) => {
            console.log(response);
            alert("Success! Check the console for the results.");
        })
        .catch((error) => {
            console.log(error)
        })
  };

  return (
    <>
      <h3>IBM Quantum</h3>
      <p>
        If you want to use your own IBM Quantum account to use a IBM quantum
        computer in the cloud, you can do it by entering your API token. You can
        find it in your IBM Quantum account, in the "Account settings / Account
        overview" section.
      </p>
      <p>
        If you don't have an account, you can create one for free{" "}
        <a
          className="link-primary"
          href="https://quantum-computing.ibm.com/login"
        >
          here
        </a>
        .
      </p>

      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="IBM API Token"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="IBM API Token"
            onChange={(e) => {
              setApiToken(e.target.value);
            }}
            value={apiToken}
          />
        </FloatingLabel>
        <Button variant="outline-success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default IBM;
