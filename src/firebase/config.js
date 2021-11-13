import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDmczJLglnE5i2gCyIoV3Op-d9ROstwvds",
    authDomain: "mymoneykeeper.firebaseapp.com",
    projectId: "mymoneykeeper",
    storageBucket: "mymoneykeeper.appspot.com",
    messagingSenderId: "635868025985",
    appId: "1:635868025985:web:78c76f565489e02f71a980"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFireStore, projectAuth }