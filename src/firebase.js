// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFSW0rNqDPJvMElyQEhMphxCm73XjR9xg",
  authDomain: "pinterest-clone-6e6f8.firebaseapp.com",
  projectId: "pinterest-clone-6e6f8",
  storageBucket: "pinterest-clone-6e6f8.appspot.com",
  messagingSenderId: "37661118337",
  appId: "1:37661118337:web:99b739ea007e8af69b2280"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const imgDb = getStorage(app);