// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1QhqoIzSSbmy20K8mW5cwglnBNn_t6YQ",
  authDomain: "mychat-fdec5.firebaseapp.com",
  projectId: "mychat-fdec5",
  storageBucket: "mychat-fdec5.appspot.com",
  messagingSenderId: "189526779123",
  appId: "1:189526779123:web:79ec4364a466b498d4c386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig