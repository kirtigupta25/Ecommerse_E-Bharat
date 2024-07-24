// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoSHGag28DXNVmz6umfoCMhPVaridNIK4",
  authDomain: "ecommerce-45870.firebaseapp.com",
  projectId: "ecommerce-45870",
  storageBucket: "ecommerce-45870.appspot.com",
  messagingSenderId: "995239873819",
  appId: "1:995239873819:web:e2c858924b2d36a8f517be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app);
const auth=getAuth(app);
export {fireDB,auth}