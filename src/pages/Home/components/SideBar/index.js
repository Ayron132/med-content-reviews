import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { styles } from "./styles";

const Sidebar = ({ user, upcomingRevisions, handleLogout, isMobile }) => (
  <div style={{...styles.sideBar,  width: isMobile ? "100%" : "300px", }}>
    <div style={styles.sideBarContainer}>
      <h5 style={styles.title}>Bem-vindo, {user.displayName || "Usuário"}!</h5>
      <img
        src={user.photoURL || "https://via.placeholder.com/150"}
        alt="Avatar"
        style={styles.avatar}
      />
      <p style={styles.email}>{user.email}</p>
      <button style={styles.button} onClick={handleLogout}>
        Sair
      </button>
      {upcomingRevisions.length > 0 && (
        <>
          <h5 style={{ marginTop: 40, color: "#cf2f47" }}>
            Revisões nos Próximos 5 Dias
          </h5>
          <Table responsive bordered hover>
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Conteúdo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {upcomingRevisions.map((revision) => (
                <tr key={revision.id}>
                  <td>{revision.subjectId}</td>
                  <td>{moment(revision.revisionDate).format("DD/MM/YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  </div>
);

export default Sidebar;
