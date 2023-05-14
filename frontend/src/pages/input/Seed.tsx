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
    const MAX = "9999";
    const handleMaxLength = (e: any) => {
      // Check if value is > MAX
      if (e.target.value.length > MAX.length) {
        e.target.value = e.target.value.slice(0, MAX.length);
      }
      // Check if value is < 0
      if (e.target.value < 0) {
        e.target.value = "0";
      }
    }
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
              max={MAX}
              onChange={(e) => {
                if (e.target.value)
                  handleMaxLength(e);
                  dispatch({ type: "setSeed", payload: e.target.value });
              }}
              value={state.seed}
            />
            <Form.Control.Feedback type="invalid">
              Only numbers 0 &le; seed &le; 9999 are allowed
            </Form.Control.Feedback>
          </Form.Group>
        </>
      );
}
