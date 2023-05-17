import { useContext } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import "react-medium-image-zoom/dist/styles.css";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ThemeContext } from "../../context/ThemeContext";

export function Circuit({
  circuit,
  qasm,
}: {
  circuit: { light: string; dark: string };
  qasm: string;
}) {
  const { theme } = useContext(ThemeContext);
  const light_circuit = `data:image/png;base64,${circuit.light}`;
  const dark_circuit = `data:image/png;base64,${circuit.dark}`;

  const saveStringToFile = (str: string, filename: string) => {
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };
  if (circuit.light === "" || circuit.dark === "") {
    return <>
      <p>
        Circuits are not available when using quantum computers.
      </p>
    </>
  }
  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Download as QASM Circuit</Tooltip>}>
        <Button
          style={{ float: 'right'}}
          type="button"
          variant="outline-primary"
          size="sm"
          onClick={() => saveStringToFile(qasm, "circuit.qasm")}
        >
          <DownloadIcon fontSize="small" />
        </Button>
      </OverlayTrigger>
      <TransformWrapper
        initialScale={0.5}
        limitToBounds={true}
        centerOnInit={true}
        centerZoomedOut={true}
        initialPositionX={55}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent>
              {theme === "light" ? (
                <img style={{ width: "70%" }} src={light_circuit} alt="test" />
              ) : (
                <img style={{ width: "70%" }} src={dark_circuit} alt="test" />
              )}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </>
  );
}
