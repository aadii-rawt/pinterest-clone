import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDkmk-A-r0J2fRMvHm748Gp7-sfscxlUFA",
  authDomain: "pinterest-39f68.firebaseapp.com",
  projectId: "pinterest-39f68",
  storageBucket: "pinterest-39f68.appspot.com",
  messagingSenderId: "931850443941",
  appId: "1:931850443941:web:37dc361a1d531da777c14c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const imgDb = getStorage(app);