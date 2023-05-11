import { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ScrollContext } from "../../../context/ScrollContext";
import { Card } from "../../Elements/index";
import circuit from "./circuit.png";

export function Qaoa() {
  const { firstRef } = useContext(ScrollContext);
  const body = {
    comment: "no_button",
    type: "maximize",
    objective: "x",
    constraints: ["x <= 1"],
    circuitDepth: "p = 1",
  };

  return (
    <>
      <h3 ref={firstRef}>
        QAOA <small className="text-muted">How does it work?</small>
      </h3>
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
        problems, and to see the results obtained by the algorithm. The example
        below shows how to use the tool and the circuit that is generated for
        the problem.
      </p>
      <Row id="modal-row">
        <Card body={[body]} />
        <Col>
          <div style={{ position: "relative" }}>
            <figure style={{ textAlign: "center" }}>
              <img src={circuit} alt="QAOA Circuit" style={{ width: "100%" }} />
              <figcaption>QAOA Circuit</figcaption>
            </figure>
          </div>
        </Col>
      </Row>
    </>
  );
}
