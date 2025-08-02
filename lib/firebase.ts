// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// Firestore
import { getFirestore } from "firebase/firestore"
// Storage
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKp5YRLNun-jCmbgCPOYrR__wK36BB91g",
  authDomain: "shortflim-cd7a1.firebaseapp.com",
  projectId: "shortflim-cd7a1",
  storageBucket: "shortflim-cd7a1.firebasestorage.app",
  messagingSenderId: "676292294827",
  appId: "1:676292294827:web:c3d3b380bc6800c82e9fee",
  measurementId: "G-2Z635PK93J"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

// Export objects you need
export { app, db, storage }