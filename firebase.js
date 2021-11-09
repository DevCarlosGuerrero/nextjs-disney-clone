import firebase from "firebase/app";

// import firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsXyl-iKHGXIHrvYnznHkU43dlmzvlC40",
  authDomain: "nextjs-disney-clone.firebaseapp.com",
  projectId: "nextjs-disney-clone",
  storageBucket: "nextjs-disney-clone.appspot.com",
  messagingSenderId: "899376920314",
  appId: "1:899376920314:web:dd7b9cdd78733777f9bb43",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
