// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc6nAGBDzWPNOU123jE2iGn6F2QX9JGdQ",
  authDomain: "dymphna-medals-foundationadmin.firebaseapp.com",
  projectId: "dymphna-medals-foundationadmin",
  storageBucket: "dymphna-medals-foundationadmin.firebasestorage.app",
  messagingSenderId: "930073659293",
  appId: "1:930073659293:web:bcd588738abf1c70f2d174",
  measurementId: "G-GE0N0NDJN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);