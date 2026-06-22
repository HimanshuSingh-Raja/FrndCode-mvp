import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUQdqx3vZidyJs6XtlqO4NZzCKpbdfKao",
  authDomain: "frndcode-platform.firebaseapp.com",
  projectId: "frndcode-platform",
  storageBucket: "frndcode-platform.firebasestorage.app",
  messagingSenderId: "976308387289",
  appId: "1:976308387289:web:3c427f702f3812f4dcedc8",
  measurementId: "G-T714SE5PQ2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;