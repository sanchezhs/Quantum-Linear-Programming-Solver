import Form from "react-bootstrap/Form";
import { State, Action } from "./Form";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export function Depth({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <Form.Group className="mb-3" controlId="formUpperBound">
        <Form.Label>
          Circuit Depth (p)
          <Tooltip
            title="The performance of the algorithm is influenced by the value of p > 0, 
                   and the precision of the estimation increases with larger p values. 
                   However, increasing p leads to a more complicated and larger circuit, 
                   which results in longer processing times to find a solution. 
                   The circuit size increases proportionally to p times the number of constraints."
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
          min={1}
          placeholder="Depth of the circuit"
          onChange={(e) => {
            if (e.target.value)
              dispatch({ type: "setDepth", payload: e.target.value });
          }}
          value={state.p}
        />
        <Form.Control.Feedback type="invalid">
          Only numbers &gt; 0 are allowed
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
