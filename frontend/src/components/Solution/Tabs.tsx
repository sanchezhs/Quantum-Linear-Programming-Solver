import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, Details } from "./index";
import { Solution } from '../../context/AppContext'

export function SolTab({ solution }: { solution: Solution }) {
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
              objetive={solution!.objetive}
              vars_values={solution!.vars_values}
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
