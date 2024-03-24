
import firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwwMjRDE_1uc53KrcaWpPY4Zxht4dRTE4",
  authDomain: "squash-wa.firebaseapp.com",
  projectId: "squash-wa",
  storageBucket: "squash-wa.appspot.com",
  messagingSenderId: "341392731682",
  appId: "1:341392731682:web:be18ea658c8f2acef2e47b",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}