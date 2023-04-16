import {useContext} from 'react'
import Form from "react-bootstrap/Form";
import { FormContext } from '../../context/FormContext' 

function CheckRadio() {

    const { setRadioValue } = useContext(FormContext)

  return (
    <>
      {" "}
        <div key="default-type" className="mb-3">
          <Form.Check
            type="radio"
            name="radio-group"
            id="minimize-radio"
            label="Minimize"
            value="minimize"
            onChange={(e) => {
                setRadioValue(e.target.value)
            }}
          ></Form.Check>
          <Form.Check
            type="radio"
            name="radio-group"
            id="maximize-radio"
            label="Maximize"
            value="maximize"
            onChange={(e) => {
                setRadioValue(e.target.value)
            }}
          ></Form.Check>
        </div>
    </>
  );
}

export default CheckRadio;
