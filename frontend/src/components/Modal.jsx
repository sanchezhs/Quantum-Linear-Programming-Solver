import { useContext } from "react";
import { FormContext } from "../context/AppContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function myModal(props) {

  const { modalShow, setModalShow } = useContext(FormContext);

  return (
    <>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default myModal;
