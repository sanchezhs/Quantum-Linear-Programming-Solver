import Form from "react-bootstrap/Form";
import { State, Action } from "./Form";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export function Seed({
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
              Seed
              <Tooltip
                title="Randomness of the algorithm is controlled by the seed."
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
              min={0}
              max={9999}
              onChange={(e) => {
                if (e.target.value)
                  dispatch({ type: "setSeed", payload: e.target.value });
              }}
              value={state.seed}
            />
            <Form.Control.Feedback type="invalid">
              Only numbers &gt; 0 are allowed
            </Form.Control.Feedback>
          </Form.Group>
        </>
      );
}
