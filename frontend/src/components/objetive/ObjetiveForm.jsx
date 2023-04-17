import { useContext } from "react";
import { FormContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";

function ObjetiveForm() {
  const { objetive, setObjetive } = useContext(FormContext);


  return (
    <>
      {" "}
      <Form.Group className="mb-3" controlId="formObjetive">
        <Form.Label>Optimize</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="x + 2y - 3z + ..."
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