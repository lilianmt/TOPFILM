import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAg0nvuK90jSOUxMe-omJBbrkNZ0GYGik8",
  authDomain: "topfilm-clickschool.firebaseapp.com",
  projectId: "topfilm-clickschool",
  storageBucket: "topfilm-clickschool.appspot.com",
  messagingSenderId: "42752000590",
  appId: "1:42752000590:web:1b9ebd5e7ae964604db91f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const auth = getAuth(app);

export default db;