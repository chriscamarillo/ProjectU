import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = firebase.firestore();
export const stat = firebase.firestore;

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const signOut = () => {
    auth.signOut();
}

export const generateUserDocument = async (user,...additionalData) => {
    if (!user) return;
    const userRef = db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    // if the user logs in for the first time...
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await db.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

