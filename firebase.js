import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDyPPegBy9TZ61ntG23dw1dBUgoLLkwTEQ",
  authDomain: "smart-parking-a2d54.firebaseapp.com",
  databaseURL: "https://smart-parking-a2d54-default-rtdb.firebaseio.com",
  projectId: "smart-parking-a2d54",
  storageBucket: "smart-parking-a2d54.appspot.com",
  messagingSenderId: "683598924374",
  appId: "1:683598924374:web:7537d5e451c0e6b527c9f7",
  measurementId: "G-0QW261KZGK"
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


