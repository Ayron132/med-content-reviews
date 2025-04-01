import React, { useState } from "react"
import { Table, Spinner, Tab, Nav } from "react-bootstrap"
import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./styles.css"

const localizer = momentLocalizer(moment)

const StudyTable = ({ studies, handleEditClick, handleShowConfirmModal, isLoading }) => {
  const [activeTab, setActiveTab] = useState("table")

  const calculatePercentage = (total, hits) => (total ? `${((hits / total) * 100).toFixed(0)}%` : "-")

  
  const renderCell = (revision, field, onClick) => (
    <td onClick={onClick} className="editable-cell">
      {revision ? revision[field] : "NDA"}
    </td>
  )

  const events = React.useMemo(() => 
    studies.flatMap((study) =>
      study.revisions.map((revision, i) => {
        const isOverdue = !revision.qtdQuestions && 
                         moment(revision.revisionDate).isBefore(moment(), "day");
        
        const revisionDate = moment(revision.revisionDate).startOf('day').toDate();
        
        return {
          title: `Revisão ${i + 1}: ${study.id || "Sem título"}${isOverdue ? ' ⚠ Atrasada' : ''}`,
          start: revisionDate,
          end: revisionDate,
          allDay: true,
          isOverdue
        };
      })
    ), 
  [studies]);

  const getEventStyle = React.useCallback((event) => ({
    style: {
      backgroundColor: event.isOverdue ? '#ffebee' : '#e8f5e9',
      borderColor: event.isOverdue ? '#ffcdd2' : '#c8e6c9',
      color: event.isOverdue ? '#c62828' : '#2e7d32',
      borderRadius: '4px',
      fontSize: '0.9em',
      cursor: 'pointer'
    }
  }), []);

  return (
    <div className="study-table-container">
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="table">Tabela</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="calendar">Calendário</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="table">
            <div className="table-responsive">
              <Table responsive bordered hover className="study-table">
                <thead>
                  <tr>
                    {[
                      "#",
                      "Conteúdo",
                      "Data teoria",
                      "1º Revisão",
                      "Nº T",
                      "Nº A",
                      "%",
                      "2º Revisão",
                      "Nº T",
                      "Nº A",
                      "%",
                      "3º Revisão",
                      "Nº T",
                      "Nº A",
                      "%",
                      "Ações",
                    ].map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studies
                    .sort((a, b) => a.studyDate.localeCompare(b.studyDate))
                    .map((study, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{study.id || "Sem título"}</td>
                        <td>{study.studyDate ? moment(study.studyDate).format("DD/MM/YYYY") : "Sem data"}</td>
                        {study.revisions.slice(0, 3).map((revision, i) => (
                          <React.Fragment key={i}>
                            <td
                              className={
                                revision &&
                                !revision.qtdQuestions &&
                                moment(revision.revisionDate).isAfter(moment(), "day")
                                  ? 'red' : 'inherit'
                              }
                              style={{ color: (revision && !revision.qtdQuestions && moment(revision.revisionDate).isBefore(moment(), 'day')) ? 'red' : 'inherit' }}

                            >
                              {revision ? moment(revision.revisionDate).format("DD/MM/YYYY") : "Sem revisão"}
                            </td>
                            {renderCell(revision, "qtdQuestions", () => handleEditClick(revision))}
                            {renderCell(revision, "qtdQuestionsHits", () => handleEditClick(revision))}
                            <td>{calculatePercentage(revision?.qtdQuestions, revision?.qtdQuestionsHits)}</td>
                          </React.Fragment>
                        ))}
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => handleEditClick(study)} className="edit-button" disabled={isLoading}>
                              Editar
                            </button>
                            <button
                              onClick={() => handleShowConfirmModal(study.id)}
                              className="delete-button"
                              disabled={isLoading}
                            >
                              {isLoading ? <Spinner animation="border" size="sm" /> : "Excluir"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="calendar">
          <div className="calendar-container">
          <Calendar
            key={events.length} // Força re-render quando eventos mudarem
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ 
              height: 500,
              minWidth: 800
            }}
            className="responsive-calendar"
            eventPropGetter={getEventStyle}
          />
          </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}

export default StudyTable

