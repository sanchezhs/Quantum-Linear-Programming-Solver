import { Gate } from "../../index";
import RYCircuit from "./Light/RYCircuit.svg";
import RYStateVector from "./Light/RYStateVector.png";
import RYBloch from "./Light/RYBloch.png";
import RYCircuitDark from "./Dark/DRYCircuit.svg";
import RYStateVectorDark from "./Dark/DRYStateVector.png";
import RYBlochDark from "./Dark/DRYBloch.png";
import { MathJax } from "better-react-mathjax";

export function RY() {
  const infoGate = (
    <>
      <p>
        The RY gate is a single qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\( e^{-i \\frac{\\theta}{2}Y} \\)"}
        </MathJax>
      </p>
      <p>
        The RY gate is used to flip the state of a qubit over the Y-axis
        by an angle of theta.
      </p>
      <p>Left image shows the RY gate applied to the initial state with an 
        angle of pi/2 radians.
      </p>
    </>
  );

  return (
    <>
      <Gate
        circuit={{ light: RYCircuit, dark: RYCircuitDark }}
        bloch={{ light: RYBloch, dark: RYBlochDark }}
        stateVector={{ light: RYStateVector, dark: RYStateVectorDark }}
        infoGate={infoGate}
      />
    </>
  );
}
