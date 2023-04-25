import { useContext } from "react";
import { ScrollContext } from "../../../context/ScrollContext";
import { Card } from "../../Elements/index";

export function Howto() {
  const { secondRef } = useContext(ScrollContext);


  return (
    <>
      <h3 ref={secondRef}>
        How to <small className="text-muted">Files and syntax</small>
      </h3>
      <p>
        This tool allows uploading a file with the problem to be solved.
        Upload it in the drag and drop zone. You can use either minimization or
        maximization, but make sure to follow the syntax provided in the examples
        below:
      </p>
      <Card type={"min"} />
      <Card type={"max"} />
    </>
  );
}
