import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Button from "react-bootstrap/Button";
import addStudy from "../../utils/studyUtils";
import AddStudyModal from "./components/AddStudyModal";
import DeleteModal from "./components/DeleteModal";
import EditValuesModal from "./components/EditValuesModal";
import { styles } from "./styles";
import StudyTable from "./components/StudyTable";
import Sidebar from "./components/SideBar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [studies, setStudies] = useState([]);
  const [show, setShow] = useState(false);
  const [newStudy, setNewStudy] = useState({ subject: "", studyDate: "" });
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false); 
  const [upcomingRevisions, setUpcomingRevisions] = useState([]);

  const handleClose = () => setShow(false);
  const handleShowEditModal = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);
  const [editingRevision, setEditingRevision] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 

  const handleShowConfirmModal = (studyId) => {
    setStudyToDelete(studyId);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setStudyToDelete(null);
    setShowConfirmModal(false);
  };

  const handleDeleteStudy = async () => {
    if (studyToDelete) {
      setIsLoading(true); 
      try {
      
        await deleteStudy(studyToDelete); 
        handleCloseConfirmModal(); 
      } catch (error) {
        
        console.error("Erro ao excluir estudo:", error);
      } finally {
        setIsLoading(false); 
        window.location.reload();
      }
    }
  };
  const handleEditClick = (revision) => {
    setEditingRevision(revision);
    setEditedValues({
      qtdQuestions: revision.qtdQuestions,
      qtdQuestionsHits: revision.qtdQuestionsHits,
    });
    setShowEdit(true);
  };

  const handleEditSave = async () => {
    if (editingRevision) {
      try {
        const revisionRef = doc(
          db,
          "users",
          user.uid,
          "revisions",
          editingRevision.id
        );
        await updateDoc(revisionRef, {
          qtdQuestions: editedValues.qtdQuestions,
          qtdQuestionsHits: editedValues.qtdQuestionsHits,
        });
        setShowEdit(false);
        alert("Revisão atualizada com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao atualizar revisão:", error.message);
        alert("Erro ao salvar alterações.");
      }
    }
  };

  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userStudiesRef = collection(db, "users", currentUser.uid, "studies");
          const studiesSnapshot = await getDocs(userStudiesRef);
          const studies = studiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const userRevisionsRef = collection(db, "users", currentUser.uid, "revisions");
          const revisionsSnapshot = await getDocs(userRevisionsRef);
          const revisions = revisionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

    
          const studiesWithRevisions = studies.map((study) => {
            const relatedRevisions = revisions.filter(
              (revision) => revision.subjectId === study.id
            );
            return { ...study, revisions: relatedRevisions };
          });

          setStudies(studiesWithRevisions);

        
          const currentDate = new Date();
          const fiveDaysFromNow = new Date();
          fiveDaysFromNow.setDate(currentDate.getDate() + 5);

          const upcomingRevisions = revisions.filter((revision) => {
            const revisionDate = new Date(revision.revisionDate); 
            return revisionDate >= currentDate && revisionDate <= fiveDaysFromNow;
          });

          setUpcomingRevisions(upcomingRevisions);
        } catch (error) {
          console.error("Erro ao buscar estudos e revisões:", error.message);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error("Erro ao deslogar:", error.message);
      }
    };

  const handleSaveStudy = async () => {
    setIsSaving(true);
    if (!newStudy.subject || !newStudy.studyDate) {
      alert("Por favor, preencha todos os campos.");
      setIsSaving(false);
      return;
    }

    try {
      await addStudy(newStudy.subject, newStudy.studyDate, newStudy)
      setStudies([
        ...studies,
        { id: newStudy.subject, studyDate: newStudy.studyDate },
      ]);
      setNewStudy({ title: "", studyDate: "" }); 
     
      setIsSaving(false);
      setShow(false);
      alert("Estudo criado!");
      window.location.reload();
    } catch (error) {
      setIsSaving(false);
      console.error("Erro ao adicionar estudo:", error.message);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deleteStudy = async (subject) => {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userId);
    const studyDocRef = doc(userDocRef, "studies", subject);
  
    try {
      await deleteDoc(studyDocRef);
  
    
      const revisionsRef = collection(userDocRef, "revisions");
      const q = query(revisionsRef, where("subjectId", "==", subject));
      const revisionsSnapshot = await getDocs(q);
  
    
      const deletePromises = [];
      revisionsSnapshot.forEach((revisionDoc) => {
        deletePromises.push(deleteDoc(revisionDoc.ref));
      });
  
      await Promise.all(deletePromises);
  
      console.log("Estudo e revisões deletados com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar estudo:", error.message);
    }
  };
  

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{
      ...styles.container,
      flexDirection: isMobile ? "column" : "row",
    }}>
      <Sidebar
        user={user}
        upcomingRevisions={upcomingRevisions}
        handleLogout={handleLogout}
        isMobile={isMobile}
      />
        <div style={{...styles.contentContainer, width: isMobile ? "100%" : "calc(100vw - 330px)",  paddingLeft: isMobile ? "0" : "15px"}}>
          <div style={{...styles.content, paddingLeft: isMobile ? "10px" : "50px",
      paddingRight: isMobile ? "10px" : "50px"}}>
            <div style={styles.contentHeader}>
              <h1>Tabela de Estudos</h1>
              <Button variant="primary" onClick={handleShowEditModal}>
                Adicionar Estudo
              </Button>
            </div>
            <StudyTable 
              studies={studies} 
              handleShowConfirmModal={handleShowConfirmModal} 
              handleEditClick={handleEditClick} 
              isLoading={isLoading}
            />
        </div>
      </div>
      <AddStudyModal 
        show={show} 
        handleClose={handleClose} 
        setNewStudy={setNewStudy} 
        newStudy={newStudy} 
        isSaving={isSaving} 
        handleSaveStudy={handleSaveStudy}
      />

      <DeleteModal 
        showConfirmModal={showConfirmModal} 
        handleCloseConfirmModal={handleCloseConfirmModal} 
        handleDeleteStudy={handleDeleteStudy} 
        isLoading={isLoading}
      />

      <EditValuesModal 
        showEdit={showEdit} 
        setShowEdit={setShowEdit} 
        editedValues={editedValues} 
        setEditedValues={setEditedValues} 
        handleEditSave={handleEditSave}
      />
    </div>
  );
};


export default Home;
