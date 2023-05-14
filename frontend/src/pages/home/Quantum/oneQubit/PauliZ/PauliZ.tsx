import { Gate } from "../../index";
import PauliZCircuit from "./ZCircuit.svg";
import ZStateVector from "./ZStateVector.png";
import PauliZBloch from "./ZBloch.png";
import { MathJax } from "better-react-mathjax";

export function PauliZ() {
  const infoGate = (
    <>
      <p>
        The Pauli-Z gate is a single qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} \\)"}
        </MathJax>
      </p>
      <p>
        The Pauli-Z gate is used to flip the state of a qubit over the Z-axis.
      </p>
      <p>The image shows the Z gate applied to the initial state</p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(Z|0\\rangle = -1|0\\rangle\\)"}
        </MathJax>
      </p>
    </>
  );

  return (
    <>
      <Gate
        circuit={PauliZCircuit}
        bloch={PauliZBloch}
        stateVector={ZStateVector}
        infoGate={infoGate}
      />
    </>
  );
}
