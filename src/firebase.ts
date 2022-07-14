// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-x2VqHi4gWyGN6ICaES4jSvSEi1bIiYo",
  authDomain: "project-6dede.firebaseapp.com",
  projectId: "project-6dede",
  storageBucket: "project-6dede.appspot.com",
  messagingSenderId: "35430735527",
  appId: "1:35430735527:web:406c606c35c8c6cbbb8582",
  measurementId: "G-KWV8ZWY7E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
// const analytics = getAnalytics(app);