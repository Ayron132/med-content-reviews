import React from "react";
import { Table, Spinner } from "react-bootstrap";
import moment from 'moment';

const StudyTable = ({ studies, handleEditClick, handleShowConfirmModal, isLoading }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      width: "100%",
      padding: "20px",
    }}
  >
    <Table
      responsive
      bordered
      hover
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        overflow: "hidden",
        fontSize: "16px",
        border: "1px solid #dee2e6",
      }}
    >
      <thead style={{ backgroundColor: "#f8f9fa" }}>
        <tr>
          <th style={{ padding: "12px", textAlign: "center" }}>#</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Conteúdo</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Data teoria</th>
          <th style={{ padding: "12px", textAlign: "center" }}>1º Revisão</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Nº T</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Nº A</th>
          <th style={{ padding: "12px", textAlign: "center" }}>2º Revisão</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Nº T</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Nº A</th>
          <th style={{ padding: "12px", textAlign: "center" }}>3º Revisão</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Nº T</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Nº A</th>
          <th style={{ padding: "12px", textAlign: "center" }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {studies.sort((a, b) => a.studyDate.localeCompare(b.studyDate)).map((study, index) => (
          <tr key={index}>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {index + 1}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {study.id || "Sem título"}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {study.studyDate
                ? moment(study.studyDate).format("DD/MM/YYYY")
                : "Sem data"}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {study.revisions && study.revisions[0]
                ? moment(study.revisions[0].revisionDate).format("DD/MM/YYYY")
                : "Sem revisão"}
            </td>
            <td
              onClick={() => handleEditClick(study.revisions[0])}
              style={{
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
                border: "1px dashed #007bff",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            >
              {study.revisions && study.revisions[0]
                ? study.revisions[0].qtdQuestions
                : "NDA"}
            </td>
            <td
              onClick={() => handleEditClick(study.revisions[0])}
              style={{
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
                border: "1px dashed #007bff",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            >
              {study.revisions && study.revisions[0]
                ? study.revisions[0].qtdQuestionsHits
                : "NDA"}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {study.revisions && study.revisions[1]
                ? moment(study.revisions[1].revisionDate).format("DD/MM/YYYY")
                : "Sem revisão"}
            </td>
            <td
              onClick={() => handleEditClick(study.revisions[1])}
              style={{
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
                border: "1px dashed #007bff",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            >
              {study.revisions && study.revisions[1]
                ? study.revisions[1].qtdQuestions
                : "NDA"}
            </td>
            <td
              onClick={() => handleEditClick(study.revisions[1])}
              style={{
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
                border: "1px dashed #007bff",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            >
              {study.revisions && study.revisions[1]
                ? study.revisions[1].qtdQuestionsHits
                : "NDA"}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {study.revisions && study.revisions[2]
                ? moment(study.revisions[2].revisionDate).format("DD/MM/YYYY")
                : "Sem revisão"}
            </td>
            <td
              onClick={() => handleEditClick(study.revisions[2])}
              style={{
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
                border: "1px dashed #007bff",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            >
              {study.revisions && study.revisions[2]
                ? study.revisions[2].qtdQuestions
                : "NDA"}
            </td>
            <td
              onClick={() => handleEditClick(study.revisions[2])}
              style={{
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
                border: "1px dashed #007bff",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            >
              {study.revisions && study.revisions[2]
                ? study.revisions[2].qtdQuestionsHits
                : "NDA"}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
            <button
              onClick={() => handleShowConfirmModal(study.id)} 
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" /> 
              ) : (
                "Excluir"
              )}
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default StudyTable;
