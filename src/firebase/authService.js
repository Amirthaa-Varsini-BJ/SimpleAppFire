// src/firebase/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Signup & save user info in Firestore
export const signUp = async (username, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save to Firestore
  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    createdAt: serverTimestamp(),
  });

  return user;
};

// Login
export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
