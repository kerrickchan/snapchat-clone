import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD1vBV6VN_U5LnNAAD5Pny9zfdFKr-cC9Y",
  authDomain: "snapchat-clone-ee120.firebaseapp.com",
  projectId: "snapchat-clone-ee120",
  storageBucket: "snapchat-clone-ee120.appspot.com",
  messagingSenderId: "885171860126",
  appId: "1:885171860126:web:5e375fc0e89d82e881418f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GithubAuthProvider();
