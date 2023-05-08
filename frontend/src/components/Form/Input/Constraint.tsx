import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Form, Button, InputGroup } from "react-bootstrap";
import { ConstraintAction, ConstraintType } from "./Logic";

export function Constraint({
  constraints,
  constraint,
  dispatch,
}: {
  constraints: ConstraintType[];
  constraint: { id: number; value: string };
  dispatch: React.Dispatch<ConstraintAction>;
}) {
  // const { constraints, deleteConstraint, setConstraints } =
  //   useContext(AppContext);

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
            //setConstraints(updatedConstraints);
            dispatch({ type: "updateConstraints", payload: updatedConstraints });
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
          //onClick={() => deleteConstraint(constraint.id)}
          onClick={() => dispatch({ type: "deleteConstraint", payload: constraint.id })}
        >
          Remove
        </Button>
      </InputGroup>
    </>
  );
}
