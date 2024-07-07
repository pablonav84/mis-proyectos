import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7anjL_O8hGKsfmHrox2XK8kqnjwbEJjY",
  authDomain: "zapas-proyect.firebaseapp.com",
  projectId: "zapas-proyect",
  storageBucket: "zapas-proyect.appspot.com",
  messagingSenderId: "984981059991",
  appId: "1:984981059991:web:023350b9d0559ea184ecd2",
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
