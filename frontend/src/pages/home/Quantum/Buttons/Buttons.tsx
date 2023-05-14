import { useState } from 'react';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap'
import { Hadamard, PauliX, PauliY, PauliZ, RX, RY, RZ, CNOT, RZZ } from '../index';

export function GateMenu() {
  const [gate, setGate] = useState('hadamard');

  const handleOnClick = (event: any) => {
    setGate(event.currentTarget.value);
  };

  let icon = <></>;
  if (gate === 'hadamard') {
    icon = <Hadamard />;
  } else if (gate === 'pauliX') {
    icon = <PauliX />;
  } else if (gate === 'pauliY') {
    icon = <PauliY />;
  } else if (gate === 'pauliZ') {
    icon = <PauliZ />;
  } else if (gate === 'RX') {
     icon = <RX />;
  } else if (gate === 'RY') {
    icon = <RY />;
  } else if (gate === 'RZ') {
    icon = <RZ />;
  } else if (gate === 'CNOT') {
    icon = <CNOT />;
  } else if (gate === 'RZZ') {
    icon = <RZZ />;
  }

  return (
    <>
      <Row id="modal-row">
        <Col md={6}>
          <h5>1-qubit Gates</h5>
          <ButtonGroup aria-label="Gate menu">
            <Button variant="outline-secondary" type='button' value='hadamard' onClick={handleOnClick}>Hadamard</Button>
            <Button variant="outline-secondary" type='button' value='pauliX' onClick={handleOnClick}>Pauli X</Button>
            <Button variant="outline-secondary" type='button' value='pauliY' onClick={handleOnClick}>Pauli Y</Button>
            <Button variant="outline-secondary" type='button' value='pauliZ' onClick={handleOnClick}>Pauli Z</Button>
            <Button variant="outline-secondary" type='button' value='RX' onClick={handleOnClick}>RX</Button>
            <Button variant="outline-secondary" type='button' value='RY' onClick={handleOnClick}>RY</Button>
            <Button variant="outline-secondary" type='button' value='RZ' onClick={handleOnClick}>RZ</Button>
          </ButtonGroup>
        </Col>
        <Col>
          <h5>2-qubit Gates</h5>
          <ButtonGroup aria-label="Gate menu">
            <Button variant="outline-secondary" type='button' value='CNOT' onClick={handleOnClick}>CNOT</Button>
            <Button variant="outline-secondary" type='button' value='RZZ' onClick={handleOnClick}>RZZ</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <div className="icon-container">
        {icon}
      </div>
    </>
  );
}
