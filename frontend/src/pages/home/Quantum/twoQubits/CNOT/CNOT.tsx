import { Gate } from "../../index";
import CNOTCircuit from "./CNOTCircuit.svg";
import CNOTStateVector from "./CNOTStateVector.png";
import CNOTBloch from "./CNOTBloch.png";
import { MathJax } from "better-react-mathjax";

export function CNOT() {
  const infoGate = (
    <>
      <p>
        The CNOT gate is a two qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {
            "\\(\\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix} \\)"
          }
        </MathJax>
      </p>
      <p>
        The CNOT gate acts on two qubits, a control qubit and a target qubit.
        If the control qubit is in the state |1⟩, then the target qubit is
        flipped. If the control qubit is in the state |0⟩, then the target
        qubit is not flipped.
        CNOT is used to entangle two qubits.
      </p>
      <p>This image shows the CNOT gate applied the state |10⟩</p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(CNOT|10\\rangle = |11\\rangle\\)"}
        </MathJax>
      </p>
      <p>
        As the control qubit is in state |1⟩, the state of the target qubit is
        changed from |0⟩ to |1⟩.
      </p>
    </>
  );

  return (
    <>
      <Gate
        circuit={CNOTCircuit}
        stateVector={CNOTStateVector}
        bloch={CNOTBloch}
        infoGate={infoGate}
      />
    </>
  );
}
