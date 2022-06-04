import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBC1YvEJ16m7KZWZoK7_hdAi9vajb7iw-Y",
    authDomain: "rachape-app.firebaseapp.com",
    databaseURL: "https://rachape-app-default-rtdb.firebaseio.com",
    projectId: "rachape-app",
    storageBucket: "rachape-app.appspot.com",
    messagingSenderId: "891671003238",
    appId: "1:891671003238:web:616211221d1a07c11b2da7",
    measurementId: "G-ZJMPKJXCGV"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }