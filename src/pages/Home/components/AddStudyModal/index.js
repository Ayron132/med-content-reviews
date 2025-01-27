import React from 'react'

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const AddStudyModal = ({show, handleClose, setNewStudy, newStudy, isSaving, handleSaveStudy}) => {
  
  const resetStudy = () => {
    setNewStudy({
      subject: "",
      studyDate: "",
      revision1: false,
      revision1Number: "",
      revision2: false,
      revision2Number: "",
      revision3: false,
      revision3Number: "",
    });
  };

  const handleModalClose = () => {
    resetStudy();
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Estudo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formStudyTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título do estudo"
              value={newStudy.subject}
              onChange={(e) =>
                setNewStudy({ ...newStudy, subject: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStudyDate">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              value={newStudy.studyDate}
              onChange={(e) =>
                setNewStudy({ ...newStudy, studyDate: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStudyTitle">
          <Form.Check 
            type="switch"
            size="lg"
            id="custom-switch"
            label="Definir o intervalo da primeira revisão"
            onClick={(e) => {setNewStudy({ ...newStudy, revision1: !newStudy.revision1 })}}
          />
           </Form.Group>
         <Form.Group className="mb-3" controlId="formStudyTitle">
            <Form.Label>Primeira revisão</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite o intervalo da primeira revisão"
              value={newStudy.revision1Number}
              disabled={!newStudy.revision1}
              onChange={(e) =>
                setNewStudy({ ...newStudy, revision1Number: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStudyTitle">
          <Form.Check 
            type="switch"
            size="lg"
            id="custom-switch"
            label="Definir o intervalo da segunda revisão"
            onClick={() => {setNewStudy({ ...newStudy, revision2: !newStudy.revision2 })}}
          />
          </Form.Group>
         <Form.Group className="mb-3" controlId="formStudyTitle">
            <Form.Label>Segunda revisão</Form.Label>
            <Form.Control
              type="number"
              disabled={!newStudy.revision2}
              placeholder="Digite o intervalo da segunda revisão"
              value={newStudy.revision2Number}
              onChange={(e) =>
                setNewStudy({ ...newStudy, revision2Number: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStudyTitle">
            <Form.Check
              type="switch"
              size="lg"
              id="custom-switch"
              label="Definir o intervalo da terceira revisão"
              onClick={(e) => {setNewStudy({ ...newStudy, revision3: !newStudy.revision3 })}}
            />
           </Form.Group>
          <Form.Group className="mb-3" controlId="formStudyTitle">
            <Form.Label>Terceira revisão</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite o intervalo da terceira revisão"
              value={newStudy.revision3Number}
              disabled={!newStudy.revision3}
              onChange={(e) =>
                setNewStudy({ ...newStudy, revision3Number: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose} disabled={isSaving}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSaveStudy} disabled={isSaving}>
          {isSaving ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Salvando...
            </>
          ) : (
            "Salvar"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddStudyModal