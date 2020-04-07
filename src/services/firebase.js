import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "", // PLACE UR API KEY IN HERE BEFORE RUNNING!
    authDomain: "projectu-51ef9.firebaseapp.com",
    databaseURL: "https://projectu-51ef9.firebaseio.com",
    projectId: "projectu-51ef9",
    storageBucket: "projectu-51ef9.appspot.com",
    messagingSenderId: "225676322565",
    appId: "1:225676322565:web:b72205ae8654fbe447796c",
    measurementId: "G-LCFS9K4SDQ"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const signOut = () => {
    auth.signOut();
}

