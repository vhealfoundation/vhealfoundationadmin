// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuyjnR8xRfPYSstsz6miD_IHNz-R83_Iw",
  authDomain: "dymphna-medals-foundation.firebaseapp.com",
  projectId: "dymphna-medals-foundation",
  storageBucket: "dymphna-medals-foundation.firebasestorage.app",
  messagingSenderId: "812045800412",
  appId: "1:812045800412:web:73bf807259b49fe1987519",
  measurementId: "G-EQEF8GZZLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);