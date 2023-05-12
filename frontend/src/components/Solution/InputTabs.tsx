import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, Details } from "./index";
import { InputSolution } from "../../context/AppContext";

export function InputSolTab({
  inputSolution,
}: {
  inputSolution: InputSolution;
}) {
  console.log(inputSolution.vars_values)
  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="details"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="details" title="Details">
        {inputSolution && (
          <Row id="modal-row">
            <Col>
              <Details
                objetive={inputSolution.objetive}
                vars_values={inputSolution.vars_values}
                qubits={inputSolution.num_qubits}
              />
            </Col>
            <Col>
              <Histogram histogram={inputSolution.histogram} />
            </Col>
          </Row>
        )}
      </Tab>
      <Tab eventKey="Circuit" title="Circuit">
        {inputSolution && (
          <Circuit circuit={inputSolution.circuit} qasm={inputSolution.qasm} />
        )}
      </Tab>
    </Tabs>
  );
}
