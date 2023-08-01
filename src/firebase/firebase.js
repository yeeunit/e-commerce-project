// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn9Iaty0OXI0z6GgBH-oGYDDcha5gpmlg",
  authDomain: "react-next-shop-app-90d86.firebaseapp.com",
  projectId: "react-next-shop-app-90d86",
  storageBucket: "react-next-shop-app-90d86.appspot.com",
  messagingSenderId: "580786236074",
  appId: "1:580786236074:web:2d47a404e32ac7739c3ed3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
