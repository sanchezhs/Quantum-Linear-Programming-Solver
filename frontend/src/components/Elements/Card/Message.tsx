import { useState } from "react";
import Button from "react-bootstrap/Button";

export function Message({ fileContents }: { fileContents: string }) {
  const [show, setShow] = useState(false);
  if (fileContents) {
    return (
      <>
        <Button
          variant="outline-info"
          size="sm"
          className="mb-2 mt-2"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </Button>
        {show && (
          <div>
            <pre style={{ borderRadius: "10px" }}>
              <code>{fileContents}</code>
            </pre>
          </div>
        )}
      </>
    );
  }
  return <></>;
}
