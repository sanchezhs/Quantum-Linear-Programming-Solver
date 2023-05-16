import { Form } from "react-bootstrap";
import { useState } from "react";
import { Action } from "./Slider";

export function Backend({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  return (
    <>
      <Form.Check
        required
        type="radio"
        name="radio-group-sim"
        id="simulator-radio"
        label="Simulator"
        value="simulator"
        defaultChecked={true}
        onChange={(e) => {
          dispatch({ type: "setBackend", payload: e.target.value });
        }}
      ></Form.Check>
      <Form.Check
        required
        type="radio"
        name="radio-group-sim"
        id="simulator-radio"
        label="Quantum Computer"
        value="quantum"
        feedbackType="invalid"
        onChange={(e) => {
          dispatch({ type: "setBackend", payload: e.target.value });
        }}
      ></Form.Check>
    </>
  );
}
