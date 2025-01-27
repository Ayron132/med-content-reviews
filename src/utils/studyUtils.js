import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { addDays, isMonday } from "date-fns";

const calculateNextRevision = (lastRevisionDate, studyDate, specificRevisionDate = false) => {
  const baseDate = new Date(lastRevisionDate || studyDate);
  const daysToAdd = specificRevisionDate || (lastRevisionDate ? 30 : 21);
  let nextRevision = addDays(baseDate, Number(daysToAdd));
  if (isMonday(nextRevision)) nextRevision = addDays(nextRevision, 1);
  return nextRevision.toISOString().split("T")[0];
};

const findNextAvailableDate = async (proposedDate, userDocRef) => {
  const revisionsSnapshot = await getDocs(collection(userDocRef, "revisions"));
  const existingDates = new Set(revisionsSnapshot.docs.map(doc => doc.data().revisionDate));

  while (existingDates.has(proposedDate)) {
    proposedDate = new Date(proposedDate);
    proposedDate.setDate(proposedDate.getDate() + 1);
    proposedDate = proposedDate.toISOString().split("T")[0];
  }

  return proposedDate;
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