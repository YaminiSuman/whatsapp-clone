import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCMq5k9Hke_TRCshQPlzBGyK_wMTBlNlnM",
  authDomain: "yamini-whatsapp-clone.firebaseapp.com",
  projectId: "yamini-whatsapp-clone",
  storageBucket: "yamini-whatsapp-clone.appspot.com",
  messagingSenderId: "830967331773",
  appId: "1:830967331773:web:34991390af2ca388def0d4",
  measurementId: "G-WEFF9ZMMER"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
