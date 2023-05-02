import Form from "react-bootstrap/Form";
import { State, Action } from './Form'
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export function UpperBound({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  return (
    <>
      <Form.Group className="mb-3" controlId="formUpperBound">
      <Form.Label>
          Upper Bound
          <Tooltip
            title="This value is an upper limit used to binarize the variables.
                   Log base 2 of the upper bound is the number binary digits used to represent the variables."
            followCursor
          >
            <HelpOutlineIcon
              style={{ fontSize: 15, marginLeft: "2px" }}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            />
          </Tooltip>
        </Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Maximum allowed value for the variables"
          onChange={(e) => {
            if (  e.target.value )
            dispatch({ type: "setUpperBound", payload: e.target.value});
          }}
          value={state.upperBound}
        />
        <Form.Control.Feedback type="invalid">
          Only numbers are allowed
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}
