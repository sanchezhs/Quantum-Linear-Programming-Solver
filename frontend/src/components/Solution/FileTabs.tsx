import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, Details } from "./index";
import {  FileSolution } from "../../context/AppContext";
import { CopyBlock, googlecode } from "react-code-blocks";

export function FileSolTab({
  fileSolution,
  fileContents,
}: {
  fileSolution: FileSolution;
  fileContents: string;
}) {

  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="details"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="Problem" title="Problem" style={{fontFamily: 'Fira Code'}}>
        <CopyBlock
          text={fileContents}
          language="python"
          showLineNumbers={true}
          startingLineNumber={true}
          theme={googlecode}
          codeBlock
        />
      </Tab>
      <Tab eventKey="details" title="Details">
        {fileSolution && (
          <Row id="modal-row">
            <Col>
              <Details
                objetive={fileSolution.objetive}
                vars_values={fileSolution.vars_values}
                qubits={fileSolution.num_qubits}
              />
            </Col>
            <Col>
              <Histogram histogram={fileSolution.histogram} />
            </Col>
          </Row>
        )}
      </Tab>
      <Tab eventKey="Circuit" title="Circuit">
        {fileSolution && (
          <Circuit circuit={fileSolution.circuit} qasm={fileSolution.qasm} />
        )}
      </Tab>
    </Tabs>
  );
}
