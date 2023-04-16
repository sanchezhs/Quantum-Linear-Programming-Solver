import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import Form from "react-bootstrap/Form";

function ObjetiveForm() {
  const { objetive, setObjetive } = useContext(FormContext);

  return (
    <>
      {" "}
      <Form.Group className="mb-3" controlId="formObjetive">
        <Form.Label>Optimize</Form.Label>
        <Form.Control
          type="text"
          placeholder="f(x,y,...)"
          onChange={(e) => {
            setObjetive(e.target.value);
          }}
          value={objetive}
          autoFocus
        />
      </Form.Group>
    </>
  );
}

export default ObjetiveForm;
/*
<input
type="text"
name="objetive"
placeholder="f(x,y,...)"
autoFocus
onChange={(e) => {
  setObjetive(e.target.value);
}}
value={objetive}
*/
