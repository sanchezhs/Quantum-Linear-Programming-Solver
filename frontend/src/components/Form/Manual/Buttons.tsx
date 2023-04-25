import { Button, ButtonGroup } from "react-bootstrap";

function Buttons({ formState, handleSubmit, handleReset, createConstraint }:
    { formState: any, handleSubmit: any, handleReset: any, createConstraint: any }) {
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
          Submit
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Buttons;
