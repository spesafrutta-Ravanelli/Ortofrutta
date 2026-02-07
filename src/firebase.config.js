// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqwe7FJxPT2d7ugVbgB1TmUcaIFGj8eQA",
  authDomain: "ortofrutta-ravanelli-carminati.firebaseapp.com",
  projectId: "ortofrutta-ravanelli-carminati",
  storageBucket: "ortofrutta-ravanelli-carminati.firebasestorage.app",
  messagingSenderId: "483333881088",
  appId: "1:483333881088:web:9911dda5da2b4072ed47e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
