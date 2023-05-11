import { useContext } from "react";
import { Card } from "../../Elements/index";
import {
  exampleMax,
  exampleMin,
  fullExampleMax,
  fullExampleMin,
} from "./examples";

export function Howto() {
  return (
    <>
      <p>
        This tool allows uploading a file with the problem to be solved. Upload
        it in the drag and drop zone. You can use either minimization or
        maximization, but make sure to follow the syntax provided in the
        examples below:
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card body={[exampleMin, fullExampleMin]} />
        <Card body={[exampleMax, fullExampleMax]} />
      </div>
    </>
  );
}
