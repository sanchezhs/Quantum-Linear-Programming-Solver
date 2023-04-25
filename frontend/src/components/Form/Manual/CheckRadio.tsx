import { useState } from "react";
import Form from "react-bootstrap/Form";

export function CheckRadio({ dispatch }: { dispatch: any }) {
  const [selected, setSelected] = useState(false);

  return (
    <>
      {" "}
      <div key="default-type" className="mb-3">
        <Form.Check
          required
          type="radio"
          name="radio-group"
          id="minimize-radio"
          label="Minimize"
          value="minimize"
          onChange={(e) => {
            setSelected(true);
            dispatch({ type: "setRadioValue", payload: e.target.value });
          }}
        ></Form.Check>
        <Form.Check
          required
          type="radio"
          name="radio-group"
          id="maximize-radio"
          label="Maximize"
          value="maximize"
          feedback={selected ? null : "Please select an option"}
          feedbackType="invalid"
          onChange={(e) => {
            setSelected(true);
            dispatch({ type: "setRadioValue", payload: e.target.value });
          }}
        ></Form.Check>
      </div>
    </>
  );
}

