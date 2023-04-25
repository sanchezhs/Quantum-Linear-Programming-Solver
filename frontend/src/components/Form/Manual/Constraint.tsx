import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Form, Button, InputGroup } from "react-bootstrap";

export function Constraint({
  constraint,
}: {
  constraint: { id: number; value: string };
}) {
  const { constraints, deleteConstraint, setConstraints } =
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
            const updatedConstraints = constraints.map((prevConstraint) =>
              prevConstraint.id === constraint.id
                ? { ...prevConstraint, value: e.target.value }
                : prevConstraint
            );
            setConstraints(updatedConstraints);
          }}
          value={
            constraints.find(
              (prevConstraint) => prevConstraint.id === constraint.id
            )!.value
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
