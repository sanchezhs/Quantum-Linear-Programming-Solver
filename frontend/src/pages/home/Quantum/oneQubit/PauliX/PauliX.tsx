import { Gate } from "../../index";
import PauliXCircuit from "./XCircuit.svg";
import PauliXStateVector from "./XStateVector.png";
import PauliXBloch from "./XBloch.png";
import { MathJax } from "better-react-mathjax";

export function PauliX() {
    const infoGate = (
        <>
          <p>
            The Pauli-X gate is a single qubit gate that is represented by the
            following matrix:
          </p>
          <p>
            <MathJax style={{ textAlign: "center" }}>
              {
                "\\(\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\)"
              }
            </MathJax>
          </p>
          <p>
            The Pauli-X gate is used to flip the state of a qubit over the X-axis.
          </p>
          <p>
            The image shows the X gate applied to the initial state
          </p>
          <p>
            <MathJax style={{ textAlign: "center" }}>
              {"\\(X|0\\rangle = |1\\rangle\\)"}
            </MathJax>
          </p>
        </>
      );
  return (
    <>
        <Gate
            circuit={PauliXCircuit}
            stateVector={PauliXStateVector}
            bloch={PauliXBloch}
            infoGate={infoGate}
        />
    </>
  )
}
