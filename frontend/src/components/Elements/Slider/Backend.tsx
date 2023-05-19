import { useState } from "react";
import { Form } from "react-bootstrap";
import { State, Action } from "./Slider";

export function Backend({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSimulator = e.target.value === "true";
    dispatch({ type: "setIsSimulator", payload: isSimulator });
  };

  const [isQuantumComputer, setIsQuantumComputer] = useState(false);

  return (
    <>
      <Form.Check
        required
        type="radio"
        name="radio-group-sim"
        id="simulator-radio"
        label="Simulator"
        value="true"
        checked={state.simulator}
        onChange={(e) => {
          handleRadioChange(e);
          setIsQuantumComputer(false);
        }}
      ></Form.Check>
      <Form.Check
        required
        type="radio"
        name="radio-group-sim"
        id="quantum-computer-radio"
        label="Quantum Computer"
        value="false"
        checked={!state.simulator}
        feedbackType="invalid"
        onChange={(e) => {
          handleRadioChange(e);
          setIsQuantumComputer(true);
        }}
      ></Form.Check>
      {isQuantumComputer && (
        <div style={{ marginTop: "10px" }}>
          <Form.Label>IBM API Token</Form.Label>
          <Form.Control
            required
            type="password"
            value={state.token}
            onChange={(e) =>
              dispatch({ type: "setToken", payload: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            Token necessary to access the IBM quantum computers.
          </Form.Text>
        </div>
      )}
    </>
  );
}
