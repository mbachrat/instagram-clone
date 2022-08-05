import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0TcxAC_1YSyvccAn83gtRCNb978XRpo8",
    authDomain: "instagram-clone-8f5dd.firebaseapp.com",
    projectId: "instagram-clone-8f5dd",
    storageBucket: "instagram-clone-8f5dd.appspot.com",
    messagingSenderId: "810918640209",
    appId: "1:810918640209:web:07e47df4622431fa031670",
    measurementId: "G-P43Z5DLB6G"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
