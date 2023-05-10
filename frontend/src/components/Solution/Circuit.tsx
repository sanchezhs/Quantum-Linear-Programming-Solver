import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function Circuit({ circuit, qasm }: { circuit: string; qasm: string }) {
  const dataURI = `data:image/png;base64,${circuit}`;

  const saveStringToFile = (str: string, filename: string) => {
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  return (
    <>

      <TransformWrapper initialScale={0.5} limitToBounds={true}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent>
              <img style={{ width: "70%" }} src={dataURI} alt="test" />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      <OverlayTrigger overlay={<Tooltip >Download as QASM Circuit</Tooltip>}>
        <Button
          type="button"
          variant="outline-primary"
          size="sm"
          onClick={() => saveStringToFile(qasm, "qasm.txt")}
        >
          <DownloadIcon fontSize="small"/>
        </Button>
        </OverlayTrigger>
    </>
  );
}
