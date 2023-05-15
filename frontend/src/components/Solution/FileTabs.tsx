import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, Details, IntegerProblem, QUBO } from "./index";
import { FileSolution } from "../../context/AppContext";

export function FileSolTab({
  fileSolution,
  fileContents,
}: {
  fileSolution: FileSolution;
  fileContents: string;
}) {
  console.log(fileContents);
  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="problem"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="problem" title="Problem">
        <IntegerProblem qp={fileSolution.qp} />
      </Tab>
      <Tab eventKey="qubo" title="QUBO">
        <QUBO qubo={fileSolution.qubo} />
      </Tab>
      <Tab eventKey="details" title="Details">
        <Details
          objetive={fileSolution.objetive}
          vars_values={fileSolution.vars_values}
          qubits={fileSolution.num_qubits}
          parameters={fileSolution.parameters}
        />
      </Tab>
      <Tab eventKey="circuit" title="Circuit">
        <Circuit circuit={fileSolution.circuit} qasm={fileSolution.qasm} />
      </Tab>
    </Tabs>
  );
}
