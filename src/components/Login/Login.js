import React, { useContext, useState } from 'react';

// import firebase elements
import firebase from "firebase/app";
import "firebase/auth";

// import firebase config
import firebaseConfig from './firebaseConfig'

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp((firebaseConfig));
    }

// create an instance of google provider object
const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
    
    // useState to set state of signed in user
    const [LoggedInUser, setLoggedInUser] = useState({});

    // handle google sign in
    const handleGoogleSignIn = () => {
        // promise to sing in with popup
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // set state of new user
      setLoggedInUser(user);
    }).catch((error) => {
      // Handle Errors here.
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
    });
    }
    
    return (
        <div>
            <h1>This is Login User: {LoggedInUser.email} </h1>
            <button onClick= {handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;