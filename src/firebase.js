import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "topfilm-clickschool.firebaseapp.com",
  projectId: "topfilm-clickschool",
  storageBucket: "topfilm-clickschool.appspot.com",
  messagingSenderId: "42752000590",
  appId: "1:42752000590:web:1b9ebd5e7ae964604db91f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db