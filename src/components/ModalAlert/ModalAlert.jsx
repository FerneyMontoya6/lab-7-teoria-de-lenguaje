import "bootstrap/dist/css/bootstrap.min.css";
import "./ModalAlert.css";
import { Modal, Button } from "react-bootstrap";

function ModalAlert(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Error de sintaxis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.currentAlert}</p>
        <span>
          <strong>Cadena ingresada: </strong>
          {props.valueInput}
        </span>
      </Modal.Body>
    </Modal>
  );
}

export { ModalAlert };
