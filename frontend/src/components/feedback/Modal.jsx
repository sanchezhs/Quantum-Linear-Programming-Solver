import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function myModal(props) {
  const { modalShow, setModalShow } = useContext(AppContext);
  
  return (
    <>
      <Modal
        show={modalShow.show}
        onHide={() => setModalShow({ show: false, header: "", body: "" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalShow.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {modalShow.body.objetiveErr && (
              <Row id="modal-row">
                <Col  style={{overflowY: 'scroll'}}>
                  <p>{modalShow.body.objetiveErr}</p>
                </Col>
              </Row>
            )}
            {modalShow.body.fileContents && (
              <Row id="modal-row">
                <Col style={{overflowY: 'scroll'}}>
                  <p>{modalShow.body.fileContents}</p>
                </Col>
              </Row>
            )}
            <Row id="modal-row">
              <Col style={{overflowY: 'scroll'}}>
                <p>{modalShow.body.constraintsErr}</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalShow({ show: false, header: "", body: "" })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default myModal;
