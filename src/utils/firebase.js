import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBoQitDBFqkWsyPQPWcg2tnI-txhDrF1r8",
    authDomain: "elections-app-ca92b.firebaseapp.com",
    projectId: "elections-app-ca92b",
    storageBucket: "elections-app-ca92b.appspot.com",
    messagingSenderId: "896911565665",
    appId: "1:896911565665:web:4be2d821cb3917cce61b20"
  };

  firebase.initializeApp(firebaseConfig);

  export const  auth = firebase.auth();

  export const db = firebase.firestore();
