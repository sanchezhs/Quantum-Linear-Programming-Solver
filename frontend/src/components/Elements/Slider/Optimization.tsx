import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { State, Action } from "./Slider";

export function Optimization({
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Circuit Depth (p)</Form.Label>
        <Form.Control
          required
          type="number"
          min={1}
          max={1000}
          placeholder="Depth of the circuit"
          onChange={(e) => {
            dispatch({ type: "setDepth", payload: e.target.value });
          }}
          value={state.depth}
        />
        <Form.Text className="text-muted">
          Number of layers in the circuit.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Shots</Form.Label>
        <Form.Control
          required
          type="number"
          min={1}
          max={25000}
          placeholder="Shots"
          onChange={(e) => {
            dispatch({ type: "setShots", payload: e.target.value });
          }}
          value={state.shots}
        />
        <Form.Text className="text-muted">
          The number of times the circuit is run.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUpperBound">
        <Form.Label>Seed</Form.Label>
        <Form.Control
          required
          type="number"
          min={0}
          max={MAX}
          onChange={(e) => {
            handleMaxLength(e);
            dispatch({ type: "setSeed", payload: e.target.value });
          }}
          value={state.seed}
        />
        <Form.Text className="text-muted">
          Randomness of the algorithm is controlled by the seed.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Only numbers 0 &le; seed &le; 9999 are allowed
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
