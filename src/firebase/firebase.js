import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "bloom-9593f.firebaseapp.com",
  projectId: "bloom-9593f",
  storageBucket: "bloom-9593f.appspot.com",
  messagingSenderId: "196357081175",
  appId: "1:196357081175:web:908e528b85a47af208bb12",
  measurementId: "G-7RMQT9DJJY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; // Export the app if needed
