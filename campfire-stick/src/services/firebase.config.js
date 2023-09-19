import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBNOfps86CdPkjPaxVMxaQ0WK2leYAl5jc",
    authDomain: "campfire-stick-db.firebaseapp.com",
    projectId: "campfire-stick-db",
    storageBucket: "campfire-stick-db.appspot.com",
    messagingSenderId: "965653056490",
    appId: "1:965653056490:web:197c76efbed8c73c410093",
    measurementId: "G-3DEK813F28"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



