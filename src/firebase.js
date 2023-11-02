// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMWzDs0nwdCLNXUCW9pq2fglzA1pF82hI",
  authDomain: "quiz-app-99349.firebaseapp.com",
  projectId: "quiz-app-99349",
  storageBucket: "quiz-app-99349.appspot.com",
  messagingSenderId: "762792335228",
  appId: "1:762792335228:web:523520a7ac5a70c9db76f9",
  measurementId: "G-X80J80L5ED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
