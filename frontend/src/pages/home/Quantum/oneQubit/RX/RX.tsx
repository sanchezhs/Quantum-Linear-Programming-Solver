import { Gate } from "../../index";
import RXCircuit from "./Light/RXCircuit.svg";
import RXStateVector from "./Light/RXStateVector.png";
import RXBloch from "./Light/RXBloch.png";
import RXCircuitDark from "./Dark/DRXCircuit.svg";
import RXStateVectorDark from "./Dark/DRXStateVector.png";
import RXBlochDark from "./Dark/DRXBloch.png";
import { MathJax } from "better-react-mathjax";

export function RX() {
  const infoGate = (
    <>
      <p>
        The RX gate is a single qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\( e^{-i \\frac{\\theta}{2}X} \\)"}
        </MathJax>
      </p>
      <p>
        The RX gate is used to flip the state of a qubit over the X-axis
        by an angle of theta. In QAOA, this gate is essential to induce changes in
        the state of the sistem.
      </p>

      <p>The image shows the RX gate applied to the initial state with an 
        angle of pi/2 radians.
      </p>
    </>
  );

  return (
    <>
      <Gate
        circuit={{ light: RXCircuit, dark: RXCircuitDark }}
        bloch={{ light: RXBloch, dark: RXBlochDark }}
        stateVector={{ light: RXStateVector, dark: RXStateVectorDark }}
        infoGate={infoGate}
      />
    </>
  );
}
