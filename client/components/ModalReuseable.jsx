import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalReuseable = ({
  body, title, handleShow, handleClose, show, buttonName,
}) => (
  <div>
    <Button variant="primary" onClick={handleShow}>
      {buttonName}
    </Button>
    <Modal show={show} onHide={handleClose} dialogClassName="modalStyles">
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body dialogClassName="modal-body">{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close Modal
        </Button>
      </Modal.Footer>
    </Modal>

    <span>This is a modal</span>
  </div>
);

export default ModalReuseable;
