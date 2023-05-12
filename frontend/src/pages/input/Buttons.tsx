import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { ConstraintAction } from "./Logic";

function Buttons({
  formState,
  setFormState,
  handleSubmit,
  handleReset,
  dispatch,
  waiting,
  setWaiting
}: {
  formState: {
    submitted: boolean;
    validated: boolean;
  };
  setFormState: React.Dispatch<
    React.SetStateAction<{
      submitted: boolean;
      validated: boolean;
    }>
  >;
  handleSubmit: (e: any) => void; //
  handleReset: (e: any) => void; //
  dispatch: React.Dispatch<ConstraintAction>;
  waiting: boolean;
  setWaiting:  React.Dispatch<React.SetStateAction<boolean>>
}) {

  return (
    <>
      <ButtonGroup>
        <Button
          variant="outline-primary"
          type="button"
          //onClick={() => createConstraint()}
          onClick={() => dispatch({type: "createConstraint"})}
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
        <Button
          variant="outline-danger"
          type="button"
          onClick={() => {setWaiting(false); setFormState({ submitted: false, validated: false })}}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Buttons;
