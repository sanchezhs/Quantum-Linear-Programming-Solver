import Button from "react-bootstrap/Button";
import { useState } from "react";


/**
 * Card component
 *  - type: type of the card
 *  - show: show the full example or not
 * @param props
 * @returns
 */

type CardProps = {
  body: {
    comment: string;
    type: string;
    objective: string;
    constraints: string[];
    circuitDepth: string;
  }[];
};

function renderBody(body: {
  comment: string;
  type: string;
  objective: string;
  constraints: string[];
  circuitDepth: string;
}) {
  return (
    <div>
      <h6>
        <strong>{body.circuitDepth}</strong>
      </h6>
      <h6>
        <strong>{body.type}:</strong> {body.objective}
      </h6>
      <h6>
        <strong>subject to:</strong>
      </h6>
      <ul>
        {body.constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ul>
      {/*       <h6>
        <strong>Upper bound:</strong> {body.upperbound}
      </h6> */}
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
      {body[0].comment !== "no_button"  && (
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