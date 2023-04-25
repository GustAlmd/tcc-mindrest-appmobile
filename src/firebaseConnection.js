import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3hdH0XvP6p-vchQ1cSFWn74RJ-syZhL8",
  authDomain: "mindrest-bd.firebaseapp.com",
  databaseURL: "https://mindrest-bd-default-rtdb.firebaseio.com",
  projectId: "mindrest-bd",
  storageBucket: "mindrest-bd.appspot.com",
  messagingSenderId: "1092378769290",
  appId: "1:1092378769290:web:e2889cbc0676ea73df3a73",
  measurementId: "G-RQHZYEVB52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();