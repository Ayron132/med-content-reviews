import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { addDays, isMonday, isSunday } from "date-fns";

const calculateNextRevision = (lastRevisionDate, studyDate, specificRevisionDate = false) => {
  const baseDate = new Date(lastRevisionDate || studyDate);
  const daysToAdd = specificRevisionDate || (lastRevisionDate ? 30 : 21);
  let nextRevision = addDays(baseDate, Number(daysToAdd));
  
  while (isSunday(nextRevision) || isMonday(nextRevision)) {
    nextRevision = addDays(nextRevision, 1);
  }
  
  return nextRevision.toISOString().split("T")[0];
};

const findNextAvailableDate = async (proposedDate, userDocRef) => {
  const revisionsSnapshot = await getDocs(collection(userDocRef, "revisions"));
  const existingDates = new Set(revisionsSnapshot.docs.map(doc => doc.data().revisionDate));

  while (true) {
    const dateObj = new Date(proposedDate);
    
    if (!existingDates.has(proposedDate) && 
        !isSunday(dateObj) && 
        !isMonday(dateObj)) {
      return proposedDate;
    }
    
    proposedDate = addDays(dateObj, 1).toISOString().split("T")[0];
  }
};

const createRevision = async (userDocRef, subject, revisionDate, revisionNumber) => {
  const revisionDocRef = doc(userDocRef, "revisions", revisionDate);
  await setDoc(revisionDocRef, {
    subjectId: subject,
    revisionDate,
    revisionNumber,
    qtdQuestions: 0,
    qtdQuestionsHits: 0,
    completed: false,
  });
};

const addStudy = async (subject, studyDate, specificDates) => {
  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, "users", userId);
  const studyDocRef = doc(userDocRef, "studies", subject);

  try {
    const studyDoc = await getDoc(studyDocRef);
    if (!studyDoc.exists()) {
      await setDoc(studyDocRef, { subject, studyDate });

      let lastRevisionDate = studyDate;
      for (let i = 1; i <= 3; i++) {
        const specificRevisionDate = specificDates[`revision${i}`] && specificDates[`revision${i}Number`];
        const nextRevision = calculateNextRevision(lastRevisionDate, studyDate, specificRevisionDate);
        const nextAvailableDate = await findNextAvailableDate(nextRevision, userDocRef);

        await createRevision(userDocRef, subject, nextAvailableDate, i);
        lastRevisionDate = nextAvailableDate;
      }
    }

    console.log("Estudo e revisões adicionados com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar estudo:", error.message);
  }
};

export default addStudy;