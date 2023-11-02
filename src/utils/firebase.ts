import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5IeLUTo-5houz30TdZRibIhdO3GPux-Y",
  authDomain: "heap-minds.firebaseapp.com",
  projectId: "heap-minds",
  storageBucket: "heap-minds.appspot.com",
  messagingSenderId: "1054464910219",
  appId: "1:1054464910219:web:cf2876b8ad282e6873458e",
  measurementId: "G-7NGENXBL09",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
