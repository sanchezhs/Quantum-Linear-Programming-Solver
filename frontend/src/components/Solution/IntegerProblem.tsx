import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

function save(str: string, filename: string) {
  const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
  saveAs(blob, filename);
}

export function IntegerProblem({ qp }: { qp: string }) {
  return (
    <>
      <pre
        style={{
          fontFamily: "monospace",
          maxHeight: "500px",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            overflow: "scroll",
          }}
        >
          <OverlayTrigger
            overlay={<Tooltip>Download as CPLEX LP file</Tooltip>}
          >
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => save(qp, "ilp_problem.lp")}
            >
              <DownloadIcon fontSize="small" />
            </Button>
          </OverlayTrigger>
        </div>
        {qp}
      </pre>
    </>
  );
}
