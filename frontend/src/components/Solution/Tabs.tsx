import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, Details } from "./index";

export function SolTab({ solution }: { solution: any }) {
  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="details"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="details" title="Details">
        <Row id="modal-row">
          <Col>
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
      </Tab>
      <Tab eventKey="Circuit" title="Circuit">
        <Circuit circuit={solution!.circuit} />
      </Tab>
    </Tabs>
  );
}
