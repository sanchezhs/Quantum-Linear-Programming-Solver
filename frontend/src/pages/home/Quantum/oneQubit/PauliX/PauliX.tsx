import { Gate } from "../../index";
import PauliXCircuit from "./Light/XCircuit.svg";
import PauliXStateVector from "./Light/XStateVector.png";
import PauliXBloch from "./Light/XBloch.png";
import PauliXCircuitDark from "./Dark/DPauliXCircuit.svg";
import PauliXStateVectorDark from "./Dark/DPauliXStateVector.png";
import PauliXBlochDark from "./Dark/DPauliXBloch.png";
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
            The Pauli-X gate is used to flip the state of a qubit over the X-axis. It is the analogous of the classical NOT gate.
          </p>
          <p>
            Left image shows the X gate applied to the initial state
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
            circuit={{light: PauliXCircuit, dark: PauliXCircuitDark}  }
            stateVector={{light: PauliXStateVector, dark: PauliXStateVectorDark} }
            bloch={{light: PauliXBloch, dark: PauliXBlochDark} }
            infoGate={infoGate}
        />
    </>
  )
}
