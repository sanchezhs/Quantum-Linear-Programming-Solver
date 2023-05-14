import { Gate } from "../../index";
import RXCircuit from "./RXCircuit.svg";
import RXStateVector from "./RXStateVector.png";
import RXBloch from "./RXBloch.png";
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
        circuit={RXCircuit}
        bloch={RXBloch}
        stateVector={RXStateVector}
        infoGate={infoGate}
      />
    </>
  );
}
