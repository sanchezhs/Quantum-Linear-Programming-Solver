import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Circuit, Histogram, Details, SolTab } from "./index";
import { Row, Col } from "react-bootstrap";

export function Solution() {
  const { solution } = useContext(AppContext);
  if (solution === null) {
    return <></>;
  }
  return (
    <>
      (
      solution !== null && solution !== undefined
      ? <SolTab solution={solution}/>
      : null
      )
{/*       <Row id="modal-row">
        <Col>
          <h4>Details</h4>
          <Details
            details={solution!.details}
            matrix_shape={solution!.matrix_shape}
            qubits={solution!.num_qubits}
          />
        </Col>
        <Col>
          <Histogram histogram={solution!.histogram} />
        </Col>
      </Row>

      <h4>Qubo</h4>
      <pre
        className="shadow p-3 mb-5 bg-body-tertiary"
        style={{ width: "70%" }}
      >
        <div style={{ width: "10px", float: "left", marginRight: "5px" }}>
          {solution?.qubo}
        </div>
        <code></code>
      </pre>
      <Circuit circuit={solution!.circuit} /> */}
    </>
  );
}

