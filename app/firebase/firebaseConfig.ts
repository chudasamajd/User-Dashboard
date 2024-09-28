import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC4i1JvBIHm2wRQyxTvJSPMVpZHTNTCzI",
  authDomain: "notify-me-77871.firebaseapp.com",
  projectId: "notify-me-77871",
  storageBucket: "notify-me-77871.appspot.com",
  messagingSenderId: "61278213417",
  appId: "1:61278213417:web:5f603074768f2011831338",
  measurementId: "G-7016T9Y7KM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
