import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCq_YMOhc3r2yXmDng0_csTxs9cHl5W7xM",
    authDomain: "social-butter-e184f.firebaseapp.com",
    projectId: "social-butter-e184f",
    storageBucket: "social-butter-e184f.appspot.com",
    messagingSenderId: "417939394476",
    appId: "1:417939394476:web:011a2553a1e4093f293409",
    measurementId: "G-87774VJX3H"
  });

export const auth = getAuth(firebaseApp);