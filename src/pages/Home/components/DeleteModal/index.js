import React from 'react'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const DeleteModal = ({showConfirmModal, handleCloseConfirmModal, handleDeleteStudy, isLoading}) => {
  return (
    <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Você tem certeza que deseja excluir este estudo? Essa ação não pode ser desfeita.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseConfirmModal}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={handleDeleteStudy}
          disabled={isLoading} 
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" /> 
          ) : (
            "Excluir"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal