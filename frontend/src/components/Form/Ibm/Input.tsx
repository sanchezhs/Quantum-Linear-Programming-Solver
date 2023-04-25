import { Form, FloatingLabel, Spinner, Button } from "react-bootstrap";
import type { State } from "./Form";

export function ApiForm({
  state,
  setApiToken,
  apiToken,
  handleSubmit,
}: {
  state: State;
  setApiToken: (apiToken: string) => void;
  apiToken: string;
  handleSubmit: (e: any) => void;
}) {
  return (
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
        disabled={state.submitted}
        onClick={handleSubmit}
        className="mb-3"
      >
        {state.waiting && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{
              marginRight: "5px",
            }}
          />
        )}
        {state.waiting ? "Waiting..." : "Submit"}
      </Button>
    </Form>
  );
}
