// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrLVw9sd96FFCoUCVz1lzzkS-7g9RvqqQ",
  authDomain: "smart-hostel-management-47216.firebaseapp.com",
  projectId: "smart-hostel-management-47216",
  storageBucket: "smart-hostel-management-47216.firebasestorage.app",
  messagingSenderId: "1093947592336",
  appId: "1:1093947592336:web:6accbd08be8198a40b5215"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
