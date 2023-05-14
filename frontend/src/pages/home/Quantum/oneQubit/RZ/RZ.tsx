import { Gate } from "../../index";
import RZCircuit from "./RZCircuit.svg";
import RZStateVector from "./RZStateVector.png";
import RZBloch from "./RZBloch.png";
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
        by an angle of theta.
      </p>
      <p>The image shows the RZ gate applied to the initial state with an 
        angle of pi/2 radians.
      </p>
{/*       <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(Z|0\\rangle = -1|0\\rangle\\)"}
        </MathJax>
      </p> */}
    </>
  );

  return (
    <>
      <Gate
        circuit={RZCircuit}
        bloch={RZBloch}
        stateVector={RZStateVector}
        infoGate={infoGate}
      />
    </>
  );
}
