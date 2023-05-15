import { Gate } from "../../index";
import PauliYCircuit from "./Light/YCircuit.svg";
import YStateVector from "./Light/YStateVector.png";
import PauliYBloch from "./Light/YBloch.png";
import PauliYCircuitDark from "./Dark/DPauliYCircuit.svg";
import YStateVectorDark from "./Dark/DPauliYStateVector.png";
import PauliYBlochDark from "./Dark/DPauliYBloch.png";
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
        circuit={{ light: PauliYCircuit, dark: PauliYCircuitDark }}
        bloch={{ light: PauliYBloch, dark: PauliYBlochDark }}
        stateVector={{ light: YStateVector, dark: YStateVectorDark }}
        infoGate={infoGate}
      />
    </>
  );
}
