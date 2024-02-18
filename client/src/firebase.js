// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ba25d.firebaseapp.com",
  projectId: "mern-auth-ba25d",
  storageBucket: "mern-auth-ba25d.appspot.com",
  messagingSenderId: "1048451353068",
  appId: "1:1048451353068:web:563181c205a1644dd358c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);