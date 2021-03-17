import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3mXZUCIkHualV_cmohSVjsyFga4cR3R8",
    authDomain: "cart-993dc.firebaseapp.com",
    projectId: "cart-993dc",
    storageBucket: "cart-993dc.appspot.com",
    messagingSenderId: "738411291468",
    appId: "1:738411291468:web:bb4a97bacb11299087a5e9"
  };
  // Initialize Firebase
  // firebase ko copy karna hai index.js mein
  firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


