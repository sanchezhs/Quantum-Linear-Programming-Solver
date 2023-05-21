import { useContext } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import { ThemeContext } from "../../../context/ThemeContext";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export function Gate({
  circuit,
  bloch,
  stateVector,
  infoGate,
}: {
  circuit: { light: string; dark: string };
  bloch: { light: string; dark: string };
  stateVector: { light: string; dark: string };
  infoGate: JSX.Element;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Row id="modal-row" style={{ marginTop: "50px" }}>
        <Col>
          <h5>
            Gate
            <OverlayTrigger
              overlay={
                <Tooltip>Representation of the gate in the circuit</Tooltip>
              }
            >
              <HelpOutlineIcon
                style={{ fontSize: 15, marginLeft: "2px" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              />
            </OverlayTrigger>
          </h5>
        </Col>
        <Col>
        <h5>
            State Vector
            <OverlayTrigger
              overlay={
                <Tooltip>Amplitude and phase of the qubit's state</Tooltip>
              }
            >
              <HelpOutlineIcon
                style={{ fontSize: 15, marginLeft: "2px" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              />
            </OverlayTrigger>
          </h5>
        </Col>
        <Col>
          <h5>q-Sphere</h5>
        </Col>
      </Row>
      <Row id="modal-row" style={{ marginTop: "20px" }}>
        <Col style={{ marginTop: '30px' }}>
          <figure>
            <img
              className="img-zoom"
              src={theme === "light" ? circuit.light : circuit.dark}
              alt="Circuit"
              style={{ width: "65%" }}
            />
          </figure>
        </Col>
        <Col>
          <Zoom>
            <img
              className="img-zoom"
              src={theme === "light" ? stateVector.light : stateVector.dark}
              alt="StateVector"
              style={{ width: "65%", marginTop: '45px' }}
            />
          </Zoom>
        </Col>
        <Col>
          <figure>
            <img
              className="img-zoom"
              src={theme === "light" ? bloch.light : bloch.dark}
              alt="Bloch Sphere"
              style={{ width: "65%" }}
            />
          </figure>
        </Col>
      </Row>
      <Row id="modal-row" style={{ marginBottom: "150px" }}>
        <Col>{infoGate}</Col>
      </Row>
    </>
  );
}
