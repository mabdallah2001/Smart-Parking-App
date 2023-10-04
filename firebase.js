import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
let first;

const firebaseConfig = {
  apiKey: "AIzaSyA7Jk2Zl5IPdQ_gvAdaKeCEOxGWXt_qdB4",
  authDomain: "smartattendancefireevacs-bbf5b.firebaseapp.com",
  databaseURL: "https://smartattendancefireevacs-bbf5b.firebaseio.com",
  projectId: "smartattendancefireevacs-bbf5b",
  storageBucket: "smartattendancefireevacs-bbf5b.appspot.com",
  messagingSenderId: "778020268231",
  appId: "1:778020268231:web:e7ebb2ddc6d2fcb70a76e2",
};

let app;
  
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();


export { db, auth };


