import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../main.css'

function Howto() {
  return (
    <Row>
    <h3>How to
      {" "}
      <small className="text-muted">Files and syntax</small>
    </h3>
    <p>
      To submit more than five constraints, write them in a text file and
      upload it in the drag and drop zone. You can use either minimization
      or maximization, but make sure to follow the syntax provided in the
      example below:
    </p>
    <Col>
      <pre>
      <code>
        <h6><strong>min:</strong>{" "}f(x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>m</sub>)</h6>
        <h6><strong>subject to:</strong></h6>
        <ul>
          <li>constraint 1</li>
          <li>constraint 2</li>
          <li>...</li>
          <li>constraint n</li>
        </ul>
      </code>
      </pre>
    </Col>
    <Col>
      <pre>
      <code>
        <h6><strong>max:</strong>{" "}f(x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>m</sub>)</h6>
        <h6><strong>subject to:</strong></h6>
        <ul>
          <li>constraint 1</li>
          <li>constraint 2</li>
          <li>...</li>
          <li>constraint n</li>
        </ul>
      </code>
      </pre>
    </Col>
  </Row>
  )
}

export default Howto