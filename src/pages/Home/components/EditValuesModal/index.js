import React from 'react'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditValuesModal = ({showEdit, setShowEdit, editedValues, setEditedValues, handleEditSave}) => {
  return (
    <Modal show={showEdit} onHide={() => setShowEdit(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Editar Revisão</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formQtdQuestions">
          <Form.Label>Quantidade de Questões</Form.Label>
          <Form.Control
            type="number"
            value={editedValues.qtdQuestions || ""}
            onChange={(e) =>
              setEditedValues({ ...editedValues, qtdQuestions: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formQtdQuestionsHits">
          <Form.Label>Quantidade de Acertos</Form.Label>
          <Form.Control
            type="number"
            value={editedValues.qtdQuestionsHits || ""}
            onChange={(e) =>
              setEditedValues({
                ...editedValues,
                qtdQuestionsHits: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowEdit(false)}>
        Fechar
      </Button>
      <Button variant="primary" onClick={handleEditSave}>
        Salvar
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditValuesModal