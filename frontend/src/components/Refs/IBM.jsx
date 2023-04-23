import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AppContext } from "../../context/AppContext";
import { sendToken } from "../Actions/sendToken";
import Backends from "../Feedback/BackEnds";

function IBM() {
  const { apiToken, setApiToken, setBackends, showErrorModal } =
    useContext(AppContext);
  const [waiting, setWaiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToken(apiToken, setBackends, setSubmitted, setWaiting, showErrorModal);
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
        Once you have entered your API token, you will see the available
        backends in the "Backends" section so you can choose the one you want to
        use later.
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
          className="mb-2"
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
        <Button
          variant="outline-success"
          type="submit"
          disabled={submitted}
          onClick={handleSubmit}
          className="mb-3"
        >
          {waiting && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: "5px" }}
            />
          )}
          {waiting ? "Waiting..." : "Submit"}
        </Button>
      </Form>
      <Backends />
    </>
  );
}

export default IBM;
