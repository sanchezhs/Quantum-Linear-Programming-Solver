import { Gate } from "../../index";
import RZCircuit from "./Light/RZCircuit.svg";
import RZStateVector from "./Light/RZStateVector.png";
import RZBloch from "./Light/RZBloch.png";
import RZCircuitDark from "./Dark/DRZCircuit.svg";
import RZStateVectorDark from "./Dark/DRZStateVector.png";
import RZBlochDark from "./Dark/DRZBloch.png";
import { MathJax } from "better-react-mathjax";

export function RZ() {
  const infoGate = (
    <>
      <p>
        The RZ gate is a single qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\( e^{-i \\frac{\\theta}{2}Z} \\)"}
        </MathJax>
      </p>
      <p>
        The RZ gate is used to flip the state of a qubit over the Z-axis
        by an angle of theta. When the integer linear problem is reformulated
        as a quadratic unconstrained binary optimization (QUBO) problem, the
        RZ gate is used represent the decision variables with a given angle 
        optimized by a classical optimizer outside QAOA. 
      </p>

    </>
  );

  return (
    <>
      <Gate
        circuit={{ light: RZCircuit, dark: RZCircuitDark }}
        bloch={{ light: RZBloch, dark: RZBlochDark }}
        stateVector={{ light: RZStateVector, dark: RZStateVectorDark }}
        infoGate={infoGate}
      />
    </>
  );
}
