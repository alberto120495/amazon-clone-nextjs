import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBpWik_DNQNWhO9TNkEnn-lj6lYqGHLqaE",
  authDomain: "next-68206.firebaseapp.com",
  projectId: "next-68206",
  storageBucket: "next-68206.appspot.com",
  messagingSenderId: "841527645030",
  appId: "1:841527645030:web:4fa0e64474c0a67a852ea7",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
