import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRyrLhM87ZEyiGN5s7VfO-3dEQFbE17rI",
  authDomain: "ticket-management-19e39.firebaseapp.com",
  projectId: "ticket-management-19e39",
  storageBucket: "ticket-management-19e39.appspot.com",
  messagingSenderId: "615534558254",
  appId: "1:615534558254:web:eecf1b4caa54109194f3bf",
  measurementId: "G-76P6G3NGT0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDocs,
  query,
  where,
  getDoc
}

