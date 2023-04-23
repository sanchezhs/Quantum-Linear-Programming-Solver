import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { AppContext } from "../../context/AppContext";

function CheckRadio() {
  const { setRadioValue } = useContext(AppContext);
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
            setRadioValue(e.target.value);
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
            setRadioValue(e.target.value);
          }}
        ></Form.Check>
      </div>
    </>
  );
}

export default CheckRadio;
