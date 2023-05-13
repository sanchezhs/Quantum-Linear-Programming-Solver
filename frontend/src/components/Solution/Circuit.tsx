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
        <OverlayTrigger overlay={<Tooltip >Download as QASM Circuit</Tooltip>}>
        <Button
          type="button"
          variant="outline-primary"
          size="sm"
          onClick={() => saveStringToFile(qasm, "circuit.qasm")}
        >
          <DownloadIcon fontSize="small"/>
        </Button>
        </OverlayTrigger>
      <TransformWrapper initialScale={0.5} limitToBounds={true} centerOnInit={true} centerZoomedOut={true} initialPositionX={55}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent>
              <img style={{ width: "70%" }} src={dataURI} alt="test" />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
{/*         <div style={{maxHeight: '500px', overflow: 'scroll'}}>
        <CopyBlock
            text={qasm}
            language="python"
            showLineNumbers={false}
            startingLineNumber={true}
            theme={a11yLight}
            codeBlock
          >
        </CopyBlock>
        </div> */}

    </>
  );
}
