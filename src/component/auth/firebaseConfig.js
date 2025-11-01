// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0pUKgZNIqwr06NJf7v5q29UElm55EeYM",
  authDomain: "we-deliver-46efb.firebaseapp.com",
  projectId: "we-deliver-46efb",
  storageBucket: "we-deliver-46efb.firebasestorage.app",
  messagingSenderId: "941599225483",
  appId: "1:941599225483:web:5d840c3cb7750f867b068e",
  measurementId: "G-H9P7FRNG5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();