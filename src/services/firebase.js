// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMb35ah8Ekmm1f4ufhO8tEEngGSjzagVw",
  authDomain: "notes-app-f8d50.firebaseapp.com",
  databaseURL: "https://notes-app-f8d50-default-rtdb.firebaseio.com",
  projectId: "notes-app-f8d50",
  storageBucket: "notes-app-f8d50.appspot.com",
  messagingSenderId: "191178155177",
  appId: "1:191178155177:web:21ee0055e35372962675b8",
  measurementId: "G-0CHL5HQ11K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const readAllNotesFb = () => {
  const dbRef = ref(db, "notes/");
  return get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  });
};

export const addNoteFb = async (note) => {
  try {
    const dbRef = ref(db, "notes/" + note.id);
    await set(dbRef, { ...note });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
export const updateNoteFb = async (note) => {
  try {
    const dbRef = ref(db, "notes/" + note.id);
    await update(dbRef, { ...note });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const deleteNoteFb = async (noteId) => {
  try {
    const dbRef = ref(db, "notes/" + noteId);
    await remove(dbRef);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
