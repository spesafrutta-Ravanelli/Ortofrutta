// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBqwe7FJxPT2d7ugVbgB1TmUcaIFGj8eQA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ortofrutta-ravanelli-carminati.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ortofrutta-ravanelli-carminati",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ortofrutta-ravanelli-carminati.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "483333881088",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:483333881088:web:9911dda5da2b4072ed47e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
