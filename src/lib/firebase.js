// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKnfpI0d3OUT944hO73_cu7tf8ECtdPIw",
  authDomain: "next-shop-1c151.firebaseapp.com",
  projectId: "next-shop-1c151",
  storageBucket: "next-shop-1c151.firebasestorage.app",
  messagingSenderId: "15664725660",
  appId: "1:15664725660:web:d4f71ca20f8ab5b22f3759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
