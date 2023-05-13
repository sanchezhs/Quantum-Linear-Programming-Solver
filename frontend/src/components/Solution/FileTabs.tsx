import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from '../../context/index'
import { Circuit, Histogram, Details } from "./index";
import { FileSolution } from "../../context/AppContext";
import { CopyBlock, googlecode, paraisoLight, paraisoDark } from "react-code-blocks";

export function FileSolTab({
  fileSolution,
  fileContents,
}: {
  fileSolution: FileSolution;
  fileContents: string;
}) {
  console.log(fileContents)
  const { theme } = useContext(ThemeContext);
  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="details"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="Problem" title="Problem">
        <CopyBlock
          text={fileContents}
          language="python"
          showLineNumbers={true}
          startingLineNumber={true}
          theme={theme === "light" ? paraisoLight : paraisoDark}
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
                parameters={fileSolution.parameters}
              />
            </Col>
            <Col>
              <Histogram histogram={fileSolution.histogram} />
            </Col>
          </Row>
        )}
      </Tab>
      <Tab eventKey="Circuit" title="Circuit">
        <Circuit circuit={fileSolution.circuit} qasm={fileSolution.qasm} />
      </Tab>
    </Tabs>
  );
}
