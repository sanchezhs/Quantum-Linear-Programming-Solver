import { Row, Col, Table } from "react-bootstrap";
import { MathJax } from 'better-react-mathjax'


function process_parameters(parameters: number[])  {
  const rows = [];

  for (let i = 0; i < parameters.length; i += 2) {
    let j = 0;
    if (i > 1) j = i - 1;
    
    const gamma = Math.round((parameters[i] + Number.EPSILON) * 100) / 100;
    const beta = Math.round((parameters[i+1] + Number.EPSILON) * 100) / 100;
    
    const row = (
      <Row id="modal-row">
        <Col key={i}>
          <MathJax>{`\\(\\gamma_${j} = ${gamma}\\)`}</MathJax>
        </Col>
        <Col key={i+1}>
        <MathJax>{`\\(\\beta_${j} = ${beta}\\)`}</MathJax>
        </Col>
      </Row>
    );

    rows.push(row);
  }

  return rows;
}

function process_variables(vars_values: [{ string: string }]) {
  
  return (
    <>
    <Row id="modal-row">
      <Col>
        {Object.keys(vars_values).slice(0, Math.ceil(Object.keys(vars_values).length / 2)).map((key: any) => (
          <MathJax key={key}>
            {`\\(${key} = ${vars_values[key]}\\)`}
          </MathJax>
        ))}
      </Col>
      <Col>
        {Object.keys(vars_values).slice(Math.ceil(Object.keys(vars_values).length / 2)).map((key: any) => (
          <MathJax key={key}>
            {`\\(${key} = ${vars_values[key]}\\)`}
          </MathJax>
        ))}
      </Col>
    </Row>
  </>
    )

  
}

export function Details({
  objetive,
  vars_values,
  qubits,
  parameters,
}: {
  objetive: string;
  vars_values: [{ string: string }];
  qubits: string;
  parameters: number[];
}) {

  const params_rows = process_parameters(parameters);
  const vars_rows = process_variables(vars_values);

  return (
    <Table striped hover size="sm" responsive={true} >
      <tbody>
        <tr>
          <td>Objetive value</td>
          <td>
            <MathJax>{`\\(${objetive}\\)`}</MathJax>
          </td>
        </tr>
        <tr>
          <td>Variables</td>
          <td>
            {vars_rows}
          </td>
        </tr>
        <tr>
          <td>Qubits</td>
          <td>
          <MathJax>{`\\(${qubits}\\)`}</MathJax>
          </td>
        </tr>
        <tr >
          <td>Parameters</td>
          <td >
            {params_rows}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
