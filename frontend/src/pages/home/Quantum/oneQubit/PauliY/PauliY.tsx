import { Gate } from "../../index";
import PauliYCircuit from "./YCircuit.svg";
import YStateVector from "./YStateVector.png";
import PauliYBloch from "./YBloch.png";
import { MathJax } from "better-react-mathjax";

export function PauliY() {
  const infoGate = (
    <>
      <p>
        The Pauli-Y gate is a single qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(\\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix} \\)"}
        </MathJax>
      </p>
      <p>
        The Pauli-Y gate is used to flip the state of a qubit over the Y-axis.
      </p>
      <p>The image shows the Y gate applied to the initial state</p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(Y|0\\rangle = -i|0\\rangle\\)"}
        </MathJax>
      </p>
    </>
  );

  return (
    <>
      <Gate
        circuit={PauliYCircuit}
        bloch={PauliYBloch}
        stateVector={YStateVector}
        infoGate={infoGate}
      />
    </>
  );
}
