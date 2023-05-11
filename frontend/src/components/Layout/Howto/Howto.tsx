import { useContext } from "react";
import { ScrollContext } from "../../../context/ScrollContext";
import { Card } from "../../Elements/index";

export function Howto() {
  const { secondRef } = useContext(ScrollContext);
  const fullExampleMin = {
    comment: "",
    circuitDepth: "p = 1",
    type: "minimize",
    objective: "10x + 20y - 30z",
    constraints: ["x <= 1", "2x + y <= 0", "z <= 0", "x + y + z = 0"],
  }
  const fullExampleMax = {
    comment: "",
    circuitDepth: "p = 1",
    type: "maximize",
    objective: "10x + 20y - 30z",
    constraints: ["x <= 1", "2x + y <= 0", "z <= 0", "x + y + z = 0"],
  }
  const exampleMin = {
    comment: "",
    circuitDepth: "Circuit depth = p > 0",
    type: "minimize",
    objective: "f(x1, x2, ..., xm)",
    constraints: ["constraint 1", "constraint 2", "...", "constraint n"],
  }
  const exampleMax = {
    comment: "",
    circuitDepth: "Circuit depth = p > 0",
    type: "maximize",
    objective: "f(x1, x2, ..., xm)",
    constraints: ["constraint 1", "constraint 2", "...", "constraint n"],
  }



  return (
    <>
      {/* <h3 ref={secondRef}>
        How to <small className="text-muted">Files and syntax</small>
      </h3> */}
      <p>
        This tool allows uploading a file with the problem to be solved. Upload
        it in the drag and drop zone. You can use either minimization or
        maximization, but make sure to follow the syntax provided in the
        examples below:
      </p>
      <div style={{ display: "flex", justifyContent: 'center'}}>
        <Card body={[exampleMin, fullExampleMin]} />
        <Card body={[exampleMax, fullExampleMax]} />
      </div>
    </>
  );
}
