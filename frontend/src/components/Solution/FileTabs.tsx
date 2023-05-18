import { Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, SolDetails, IntegerProblem, QUBO } from "./index";
import { FileSolution } from "../../context/AppContext";

export function FileSolTab({
  fileSolution,
}: {
  fileSolution: FileSolution;
}) {
  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="solution"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="solution" title="Solution">
        <SolDetails
          objetive={fileSolution.objetive}
          vars_values={fileSolution.vars_values}
          qubits={fileSolution.num_qubits}
          parameters={fileSolution.parameters}
        />
      </Tab>
      <Tab eventKey="problem" title="Problem">
        <IntegerProblem qp={fileSolution.qp} />
      </Tab>
      <Tab eventKey="qubo" title="QUBO">
        <QUBO qubo={fileSolution.qubo} />
      </Tab>
      <Tab eventKey="circuit" title="Circuit">
        <Circuit circuit={fileSolution.circuit} qasm={fileSolution.qasm} />
      </Tab>
    </Tabs>
  );
}
