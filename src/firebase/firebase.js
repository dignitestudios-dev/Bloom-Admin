import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "bloom-8ddae.firebaseapp.com",
  projectId: "bloom-8ddae",
  storageBucket: "bloom-8ddae.appspot.com",
  messagingSenderId: "321624617498",
  appId: "1:321624617498:web:8da2ab5fa5f7e1b65597a3",
  measurementId: "G-FX8S28FKHX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; // Export the app if needed
