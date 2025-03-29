import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4665e.firebaseapp.com",
  projectId: "mern-auth-4665e",
  storageBucket: "mern-auth-4665e.appspot.com",
  messagingSenderId: "983023474339",
  appId: "1:983023474339:web:bfc202f86b5802bd635116",
  measurementId: "G-2510YN4G1D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
