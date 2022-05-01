import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDicSJTetTdooZCo0yXD3ftqabpx4H_Fx0",
    authDomain: "messenger-b0375.firebaseapp.com",
    projectId: "messenger-b0375",
    storageBucket: "messenger-b0375.appspot.com",
    messagingSenderId: "586899280909",
    appId: "1:586899280909:web:6a8b78b3e9bf72df90b144",
    measurementId: "G-3Y8TFWD8QM"
}).auth();

