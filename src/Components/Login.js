import React from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';

// Icons 
import google from '../Assets/google.svg';

// Styles
import styles from './login.module.css';


const Login = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2>Welcome to Messenger !</h2>

                <div
                    className={styles.button} 
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <img className={styles.googleImg} src={google} alt='google' /> Sign in with Google
                </div>
            </div>
        </div>
    );
};

export default Login;