// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUAEfRz1nt488Xrl0h2ENO7qeWw5bqlas",
    authDomain: "fir-crud-76b53.firebaseapp.com",
    projectId: "fir-crud-76b53",
    storageBucket: "fir-crud-76b53.firebasestorage.app",
    messagingSenderId: "958279549066",
    appId: "1:958279549066:web:7607fad98e85646d35ed73",
    measurementId: "G-RTWS2C92FX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
