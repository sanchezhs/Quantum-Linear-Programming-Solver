import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { ScrollContext } from "../../../context/ScrollContext";
import { CopyBlock, googlecode } from "react-code-blocks";
import circuit from "./circuit.png";

export function Qaoa() {
  const { firstRef } = useContext(ScrollContext);
  const problemExample = `maximize: x\n subject to:\n x <=1\n upperbound=3, Circuit Depth (p) = 1`;

  return (
    <>
      <h3 ref={firstRef}>
        QAOA <small className="text-muted">How does it work?</small>
      </h3>
      {/* <p>explicar un poco c&oacute;mo funciona qaoa y la web, se podra usar cuenta en ibm...</p> */}
      <p>
        The Quantum Approximate Optimization Algorithm (
        <a href="https://arxiv.org/pdf/1411.4028.pdf">QAOA</a>) is a quantum
        algorithm that can be used to find approximate solutions to
        combinatorial optimization problems. It is a variational algorithm,
        meaning that it uses both a classical computer and a quantum computer
        through a process called quantum annealing, whose goal is to find the
        minimum of a function.
      </p>
      <p>
        This tool allows you to test the QAOA algorithm on integer programming
        problems, and to see the results obtained by the algorithm.
      </p>

      <Row id="modal-row">
        <Col>
          <CopyBlock
            text={problemExample}
            language="python"
            showLineNumbers={false}
            startingLineNumber={true}
            theme={googlecode}
            codeBlock
          />
        </Col>
        <Col>
          <img src={circuit} alt="QAOA Circuit" style={{ width: "100%" }} />
        </Col>
      </Row>
    </>
  );
}
