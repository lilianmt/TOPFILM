import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAg0nvuK90jSOUxMe-omJBbrkNZ0GYGik8",
  authDomain: "topfilm-clickschool.firebaseapp.com",
  projectId: "topfilm-clickschool",
  storageBucket: "topfilm-clickschool.appspot.com",
  messagingSenderId: "42752000590",
  appId: "1:42752000590:web:1b9ebd5e7ae964604db91f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;