import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function Constraint({ constraint }) {
  const { deleteConstraint, constraints, setConstraints } =
    useContext(AppContext);

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
        <Form.Control.Feedback type="invalid" className="mb-1">
          This field may not be blank.
        </Form.Control.Feedback>

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
