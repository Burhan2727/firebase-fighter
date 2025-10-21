import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
// google provider
const googleProvider = new GoogleAuthProvider();
// github provider
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  // create user or signup user-----------------------
  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signIn user----------------------------
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signIn with google popup---------------------------
  const signInWithGooglePopupFunc = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };
  // signIn with github popup---------------------------
  const signInWithGithubPopupFunc = () => {
    setLoading(true)
    return signInWithPopup(auth, githubProvider);
  };
  // sign out user -------------------
  const signOutUserFunc = () => {
    setLoading(true)
    return signOut(auth);
  };
  // forgot or reset password----------------
  const sendPasswordResetEmailFunc = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // added displayName , photoURL with sign up------------
  const updateProfileFunc = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };
  // send email varification with sign up-----------
  const sendEmailVerificationFunc = () => {
    return sendEmailVerification(auth.currentUser);
  };



  // context data object--------------
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithGooglePopupFunc,
    signInWithGithubPopupFunc,
    signOutUserFunc,
    sendPasswordResetEmailFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
  };
  //   onStateChange jeno reload dileo na jay----------------
useEffect(()=>{
    const unSubscribe =  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser)
    setUser(currentUser)
    setLoading(false)
  });
  return ()=>{
    unSubscribe()
  }
}, [])
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
