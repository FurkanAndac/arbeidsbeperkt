// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZxJUzIX2QHjNqWEt0Ms84DccRIjuqb7o",
  authDomain: "arbeidsbeperkt.firebaseapp.com",
  projectId: "arbeidsbeperkt",
  storageBucket: "arbeidsbeperkt.appspot.com",
  messagingSenderId: "976846916177",
  appId: "1:976846916177:web:4293699cbcb80d328a4670",
  measurementId: "G-KXB6W6NY0Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, analytics, db };
