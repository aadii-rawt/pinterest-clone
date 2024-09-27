// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHfFX7z7XhZ6jMdX3v7DQKmQmnYeVDkbg",
  authDomain: "pinterest-e216c.firebaseapp.com",
  projectId: "pinterest-e216c",
  storageBucket: "pinterest-e216c.appspot.com",
  messagingSenderId: "17674480816",
  appId: "1:17674480816:web:768c4c0006ecee3307df75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const imgDb = getStorage(app);