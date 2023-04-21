import Button from "react-bootstrap/Button";
import { useState } from "react";

function Card(props) {
  const [show, setShow] = useState(false);
  const fullExample = (
    <>
      <h6>
        <strong>{props.type}:</strong> 1000x + 2000y - 3000z
      </h6>
      <h6>
        <strong>subject to:</strong>
      </h6>
      <ul>
        <li>x &lt; 1</li>
        <li>2x + y &le; 0</li>
        <li>z &lt; 0</li>
        <li>x + y + z = 0</li>
      </ul>
    </>
  );
  const example = (
    <>
      <h6>
        <strong>{props.type}:</strong> f(x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>m</sub>
        )
      </h6>
      <h6>
        <strong>subject to:</strong>
      </h6>
      <ul>
        <li>constraint 1</li>
        <li>constraint 2</li>
        <li>...</li>
        <li>constraint n</li>
      </ul>
    </>
  );

  return (
    <pre className="shadow p-3 mb-5 bg-body-tertiary" style={{ width: "55%" }}>
      <div style={{ width: "10px", float: "right", marginRight: "50px" }}>
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <code>{!show ? example : fullExample}</code>
    </pre>
  );
}

export default Card;
