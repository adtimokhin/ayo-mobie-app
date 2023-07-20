// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoLAPqTP1UwrYGIZn8yBnmLcpJtTrJXZo",
  authDomain: "ayo-cc0f7.firebaseapp.com",
  projectId: "ayo-cc0f7",
  storageBucket: "ayo-cc0f7.appspot.com",
  messagingSenderId: "429604432110",
  appId: "1:429604432110:web:784b6747c2c34867f2abff",
  measurementId: "G-FS4YLJ6F88",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
