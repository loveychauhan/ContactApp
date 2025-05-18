// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeMl1Ienms443shrHBBVqpm66Sj-SyTeA",
    authDomain: "vite-contact-8aa4a.firebaseapp.com",
    projectId: "vite-contact-8aa4a",
    storageBucket: "vite-contact-8aa4a.firebasestorage.app",
    messagingSenderId: "894566598922",
    appId: "1:894566598922:web:0da18bdfc2e4aecde2d2f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 