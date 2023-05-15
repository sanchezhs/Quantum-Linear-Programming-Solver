import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Circuit, Histogram, Details, IntegerProblem, QUBO } from "./index";
import { InputSolution } from "../../context/AppContext";

export function InputSolTab({
  inputSolution,
}: {
  inputSolution: InputSolution;
}) {
  return (
    <Tabs
      style={{ marginTop: "15px" }}
      defaultActiveKey="problem"
      id="my-tab"
      className="mb-3"
    >
      <Tab eventKey="problem" title="Problem">
        <IntegerProblem qp={inputSolution.qp}/>
      </Tab>
      <Tab eventKey="qubo" title="QUBO">
        <QUBO qubo={inputSolution.qubo}/>
      </Tab>
      <Tab eventKey="details" title="Details">
        <Details
          objetive={inputSolution.objetive}
          vars_values={inputSolution.vars_values}
          qubits={inputSolution.num_qubits}
          parameters={inputSolution.parameters}
        />
      </Tab>
      <Tab eventKey="circuit" title="Circuit">
        <Circuit circuit={inputSolution.circuit} qasm={inputSolution.qasm} />
      </Tab>
    </Tabs>
  );
}
