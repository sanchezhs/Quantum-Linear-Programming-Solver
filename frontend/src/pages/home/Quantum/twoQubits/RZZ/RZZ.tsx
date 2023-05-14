import { Gate } from "../../index";
import RZZCircuit from "./RZZCircuit.svg";
import RZZStateVector from "./RZZStateVector.png";
import RZZBloch from "./RZZBloch.png";
import { MathJax } from "better-react-mathjax";

export function RZZ() {
  const infoGate = (
    <>
      <p>
        The RZZ gate is a two qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {
            "\\(I \\otimes \\ R_Z(\\theta) = \\begin{pmatrix} e^{-i\\frac{\\theta}{2}} & 0 & 0 & 0 \\\\ 0 &  e^{-i\\frac{\\theta}{2}} & 0 & 0 \\\\ 0 & 0 &  e^{-i\\frac{\\theta}{2}} & 0 \\\\ 0 & 0 & 0 &  e^{-i\\frac{\\theta}{2}} \\end{pmatrix} \\)"
          }
        </MathJax>
      </p>
        <p>
        This gate is used to encode the Hamiltonian of the integer problem into the quantum circuit.
        </p>
 
    </>
  );

  return (
    <>
      <Gate
        circuit={RZZCircuit}
        stateVector={RZZStateVector}
        bloch={RZZBloch}
        infoGate={infoGate}
      />
    </>
  );
}
