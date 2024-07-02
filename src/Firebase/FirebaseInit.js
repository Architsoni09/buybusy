// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8JWqfjorRhj9dQTd2ZsbbeD8udQqH9y8",
    authDomain: "busybuy-d9752.firebaseapp.com",
    projectId: "busybuy-d9752",
    storageBucket: "busybuy-d9752.appspot.com",
    messagingSenderId: "555064709502",
    appId: "1:555064709502:web:4df1265c91dc39cdd2232f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);