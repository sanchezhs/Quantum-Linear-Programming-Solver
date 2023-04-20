import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function myModal(props) {
  const { modalShow, setModalShow } = useContext(AppContext);
  const MAX_MODAL_LENGTH = 60;
  if (modalShow.body.objetiveErr &&
    modalShow.body.objetiveErr.length > MAX_MODAL_LENGTH) {

    modalShow.body.objetiveErr =
      modalShow.body.objetiveErr.slice(0, MAX_MODAL_LENGTH) + "...";
  }
  if (modalShow.body.constraintsErr &&
    modalShow.body.constraintsErr.length > MAX_MODAL_LENGTH) {
      
    console.log("largo");
    modalShow.body.constraintsErr =
      modalShow.body.constraintsErr.slice(0, MAX_MODAL_LENGTH) + "...";
  }

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

                <Col xs={8} md={8}>
                  <p>{modalShow.body.objetiveErr}</p>
                </Col>
              </Row>
            )}
            <Row id="modal-row">
              <Col xs={8} md={8}>
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
