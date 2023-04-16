import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function Constraint({ constraint }) {
  const { deleteConstraint, constraints, setConstraints } =
    useContext(FormContext);

  return (
    <>
      {" "}
      <InputGroup className="mb-3">
        <Form.Control
          required
          type="text"
          placeholder="x < 1"
          onChange={(e) => {
            setConstraints((prevConstraints) =>
              prevConstraints.map((prevConstraint) =>
                prevConstraint.id === constraint.id
                  ? { ...prevConstraint, value: e.target.value }
                  : prevConstraint
              )
            );
          }}
          value={
            constraints.find(
              (prevConstraint) => prevConstraint.id === constraint.id
            ).value
          }
        />
        <Button
          variant="outline-danger"
          type="button"
          onClick={() => deleteConstraint(constraint.id)}
        >
          Remove
        </Button>
      </InputGroup>
    </>
  );
}

export default Constraint;
