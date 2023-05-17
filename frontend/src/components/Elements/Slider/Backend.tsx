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
        onChange={handleRadioChange}
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
        onChange={handleRadioChange}
      ></Form.Check>
    </>
  );
}
