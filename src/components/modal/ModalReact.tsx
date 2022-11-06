import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/esm/Container';

// {props.eleccion ? "Agregar" : <FormExample/>}
export default function MydModalWithGrid(props: any) {
  const { children, title } = props;

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>{children}</Container>
      </Modal.Body>
    </Modal>
  );
}
