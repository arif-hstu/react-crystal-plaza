import React, { useContext, useState } from 'react';

// import firebase elements
import firebase from "firebase/app";
import "firebase/auth";

// import firebase config
import firebaseConfig from './firebaseConfig'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    // get history state for redirection
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // useContext to get the user state
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp((firebaseConfig));
    }

    // create an instance of google provider object
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // handle google sign in
    const handleGoogleSignIn = () => {
        // promise to sign in with popup
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                // The signed-in user info.
                var user = result.user;
                console.log(user);
                // set state of new user
                setLoggedInUser(user);
                history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
            });
    }

    return (
        <div>
            <h1>This is Login User: {loggedInUser.email} </h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;