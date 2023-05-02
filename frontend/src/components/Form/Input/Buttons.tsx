import { useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";

function Buttons({
  formState,
  handleSubmit,
  handleReset,
  createConstraint,
  waiting,
  setWaiting
}: {
  formState: any;
  handleSubmit: any;
  handleReset: any;
  createConstraint: any;
  waiting: boolean;
  setWaiting: any;
}) {

  return (
    <>
      <ButtonGroup>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => createConstraint()}
        >
          Add Constraint
        </Button>
        <Button variant="outline-primary" type="reset" onClick={handleReset}>
          Clear
        </Button>
        <Button
          variant="outline-success"
          type="submit"
          disabled={formState.submitted}
          onClick={handleSubmit}
        >
          {waiting ? "Waiting..." : "Submit"}
          {waiting && (
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
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Buttons;
