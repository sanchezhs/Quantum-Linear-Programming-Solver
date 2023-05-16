import Button from "react-bootstrap/Button";
import { useState } from "react";
import { MathJax } from 'better-react-mathjax'

/**
 * Card component
 *   - Renders a card with the given body
 *    - The body is a list of objects with the following properties:
 *      - comment: string
 *      - type: minimization or maximization
 *      - objective: string
 *      - constraints: string[], array of constraints
 *      - circuitDepth: string
 * @param props
 * @returns
 */

type CardProps = {
  body: {
    objetive: string;
    constraints: string[];
  }[];
};

function renderBody(body: {
  objetive: string;
  constraints: string[];
}) {
  const { constraints, ...dynamicProperties } = body;

  return (
    <div>
      {Object.entries(dynamicProperties).map(([key, value]) => (
        <h6 key={key}>
          <MathJax>{`\\(${value}\\)`}</MathJax>
        </h6>
      ))}
      <h6>
        <MathJax>{`\\(\\text{subject to:}\\)`}</MathJax>
      </h6>
      <ul>
        {constraints.map((constraint, index) => (
          <li key={index}>
            <MathJax>{`\\(${constraint}\\)`}</MathJax>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function Card({ body }: CardProps) {
  const [show, setShow] = useState(false);
  return (
    <pre
      className="shadow p-3 mb-5 bg-body-tertiary"
      style={{ width: "35%", marginRight: "45px" }}
    >
      {body.length > 1 && (
        <div style={{ width: "1px", float: "right", marginRight: "50px" }}>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      )}
      {/* <code>{!show ? example : fullExample}</code> */}
      <code>{!show ? renderBody(body[0]) : renderBody(body[1])}</code>
    </pre>
  );
}
