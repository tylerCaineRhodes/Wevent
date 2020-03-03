import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalReuseable = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        example button for modal
      </Button>
      <Modal show={show} onHide={handleClose} dialogClassName="modalStyles">
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Render Title component here</Modal.Title>
        </Modal.Header>
        <Modal.Body dialogClassName="modal-body">Here is where the component will go...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>

      <span>This is a modal</span>
    </div>
  );
};

export default ModalReuseable;
