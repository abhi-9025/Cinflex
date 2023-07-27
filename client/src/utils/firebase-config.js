// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCzpkK14A56_MLFX0oVdYMF4417Qq8r78E",
  authDomain: "cinflix-2d759.firebaseapp.com",
  projectId: "cinflix-2d759",
  storageBucket: "cinflix-2d759.appspot.com",
  messagingSenderId: "804184229535",
  appId: "1:804184229535:web:55fadeff05affb6bb644aa",
  measurementId: "G-1XRELEDZLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
