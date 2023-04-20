import { useContext } from "react";
import { ScrollContext } from "../../context/ScrollContext";
import Card from "./Card";

function Howto() {
  const { secondRef } = useContext(ScrollContext);


  return (
    <>
      <h3 ref={secondRef}>
        How to <small className="text-muted">Files and syntax</small>
      </h3>
      <p>
        To submit more than five constraints, write them in a text file and
        upload it in the drag and drop zone. You can use either minimization or
        maximization, but make sure to follow the syntax provided in the examples
        below:
      </p>
      <Card type={"min"} />
      <Card type={"max"} />
    </>
  );
}

export default Howto;
