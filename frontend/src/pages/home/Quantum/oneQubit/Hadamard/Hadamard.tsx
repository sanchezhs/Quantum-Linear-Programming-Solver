import { Gate } from "../../index";
import HadamardCircuit from "./Light/HadamardCircuit.svg";
import HadamardStateVector from "./Light/HStateVector.png";
import HadamardBloch from "./Light/HadamardBloch.png";
import HadamardCircuitDark from "./Dark/DHadamardCircuit.svg"; 
import HadamardStateVectorDark from "./Dark/DHadamardStateVector.png";  
import HadamardBlochDark from "./Dark/DHadamardBloch.png";
import { MathJax } from "better-react-mathjax";

export function Hadamard() {
  const infoGate = (
    <>
      <p>
        The Hadamard gate is a single qubit gate that is represented by the
        following matrix:
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {
            "\\(\\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\)"
          }
        </MathJax>
      </p>
      <p>
        The Hadamard gate is used to create superposition states. It is also
        used in many other quantum algorithms, such as the Deutsch-Jozsa
        algorithm and the quantum Fourier transform. 
        In QAOA, the Hadamard gate is applied to all qubits in the first layer
          of the circuit.
      </p>
      <p>Left image shows the H gate applied to the initial state</p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}\\)"}
        </MathJax>
      </p>
      <p>
        <MathJax style={{ textAlign: "center" }}>
          {"\\(|\\frac{1}{\\sqrt{2}}|^2 = 0.5\\)"}
        </MathJax>
      </p>
      <p>So the probability of measuring either 0 or 1 is 50%.

      </p>
    </>
  );

  return (
    <>
      <Gate
        circuit={{light: HadamardCircuit, dark: HadamardCircuitDark}  }
        stateVector={{light: HadamardStateVector, dark: HadamardStateVectorDark} }
        bloch={{light: HadamardBloch, dark: HadamardBlochDark} }
        infoGate={infoGate}
      />
    </>
  );
}
