import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkIkllUQ7gIM73fbr95CwazLdh96iod4Y",
  authDomain: "crudvuerhmd.firebaseapp.com",
  projectId: "crudvuerhmd",
  storageBucket: "crudvuerhmd.appspot.com",
  messagingSenderId: "552981945419",
  appId: "1:552981945419:web:71d6148a48e9a4883181ce",
  measurementId: "G-X918SM5C4E"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore();