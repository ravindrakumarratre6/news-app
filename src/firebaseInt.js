// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDxQfiLGprBOWdO1oNTLxw9LIWVDhMtNE",
  authDomain: "news-app-3704f.firebaseapp.com",
  projectId: "news-app-3704f",
  storageBucket: "news-app-3704f.appspot.com",
  messagingSenderId: "356811735564",
  appId: "1:356811735564:web:eedb9287b0e3cafbfa6429"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
