// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxQayLfV9hjuOjjyO0kTOe7_o5Ca63660",
  authDomain: "fir-fighter-af0dc.firebaseapp.com",
  projectId: "fir-fighter-af0dc",
  storageBucket: "fir-fighter-af0dc.firebasestorage.app",
  messagingSenderId: "1037673366619",
  appId: "1:1037673366619:web:ee1527d435b391f94c2b7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);