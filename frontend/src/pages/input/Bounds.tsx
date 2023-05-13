import Form from "react-bootstrap/Form";
import { State, Action } from "./Form";
import { Col, Row } from "react-bootstrap";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

export function Bounds({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBounds">
        <Row id="modal-row">
          <Col>
            <Form.Label>
              Upper Bound
              <Tooltip
                title="This value must be > 0, is an upper limit used to binarize the variables."
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
              max={100}
              placeholder="Maximum allowed value for the variables"
              onChange={(e) => {
                if (e.target.value)
                  dispatch({ type: "setUpperBound", payload: e.target.value });
              }}
              value={state.upperBound}
            />
            <Form.Control.Feedback type="invalid">
              Only numbers &gt; 0 are allowed
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Label>
              Lower Bound
              <Tooltip
                title="This value must be < = 0, is a lower limit used to binarize the variables."
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
              max={100}
              placeholder="Minimum allowed value for the variables"
              onChange={(e) => {
                if (e.target.value)
                  dispatch({ type: "setLowerBound", payload: e.target.value });
              }}
              value={state.lowerBound}
            />
            <Form.Control.Feedback type="invalid">
              Only numbers &gt; 0 are allowed
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
}
