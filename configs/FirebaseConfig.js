// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZgQ7sMvNQm4peTyu-DFtTUISvbX22cuQ",
  authDomain: "sodium-ray-346305.firebaseapp.com",
  projectId: "sodium-ray-346305",
  storageBucket: "sodium-ray-346305.firebasestorage.app",
  messagingSenderId: "985696434154",
  appId: "1:985696434154:web:9fc8c34a81be6349c62493",
  measurementId: "G-FLP40VDQ3P"
};
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
