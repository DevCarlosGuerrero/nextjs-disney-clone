// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
