import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { ConstraintAction } from "./types/types";

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
  const { setOpenPanel } = useContext(AppContext);
  return (
    <>
      <ButtonGroup>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => dispatch({type: "createConstraint"})}
        >
          Add Constraint
        </Button>
        <Button variant="outline-primary" type="reset" onClick={handleReset}>
          Clear
        </Button>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => setOpenPanel(true)}
        >
          Settings
        </Button>
        <Button
          variant="outline-success"
          type="submit"
          disabled={formState.submitted}
          onClick={handleSubmit}
        >
          {waiting ? "Waiting..." : "Run"}
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
