import { Row, Col } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";

export function Gate({ circuit, bloch, stateVector, infoGate}: any) {
  return (
    <>
      <Row id="modal-row" style={{ marginTop: "50px" }}>
        <Col>
          <h5>Gate</h5>
        </Col>
        <Col>
          <h5>State Vector</h5>
        </Col>
        <Col>
          <h5>q-Sphere</h5>
        </Col>
      </Row>
      <Row id="modal-row" style={{ marginTop: "20px" }}>
        <Col style={{ textAlign: "center" }}>
          <figure >
            <img className="img-zoom" src={circuit} alt="Circuit" style={{ width: "65%"}} />
          </figure>
        </Col>
        <Col>
          <Zoom>
            <img className="img-zoom" src={stateVector} alt="StateVector" style={{ width: "65%"}} />
          </Zoom>
        </Col>
        <Col>
          <figure>
            <img className="img-zoom"  src={bloch} alt="Bloch Sphere" style={{ width: "65%" }} />
          </figure>
        </Col>
      </Row>
      <Row id="modal-row" style={{marginBottom: '200px'}}>
        <Col>
        {infoGate}
        </Col>
      </Row>
    </>
  );
}



