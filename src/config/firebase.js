import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCHoSgzr42n8QLgFSWf7dF5OVheuOWknQ",
  authDomain: "promotion-e1a6d.firebaseapp.com",
  projectId: "promotion-e1a6d",
  storageBucket: "promotion-e1a6d.appspot.com",
  messagingSenderId: "651270930290",
  appId: "1:651270930290:web:89759593752fad52d9e7eb",
  measurementId: "G-5GGB7QLFQX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
