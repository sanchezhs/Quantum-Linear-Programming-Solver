import { ButtonGroup, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { State, Action } from "./Slider";

export function Problem({
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
            <Form.Label>Upper Bound</Form.Label>
            <Form.Control
              required
              autoFocus={true}
              type="number"
              min={-1000}
              max={1000}
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
            <Form.Label>Lower Bound</Form.Label>

            <Form.Control
              required
              type="number"
              min={-1000}
              max={1000}
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
