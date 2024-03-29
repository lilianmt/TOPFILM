import React, { useRef } from 'react';
import { auth  } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import './SignupScreen.css';

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In/Sign Up</h1>
                <p>Insert random credentials to Sign Up.</p>
                <input ref={emailRef} placeholder='Email' type='email' />
                <input ref={passwordRef} placeholder='Password' type='password' />
                <button type='submit' onClick={signIn}>
                    Sign In
                </button>

                <h4>
                    <span className='signupScreen_gray'> New to TOPFILM? </span> 
                    <span className='signupScreen_link' onClick={register}> 
                    Sign Up now
                    </span>
                </h4>
            </form>
        </div>
    );
}

export default SignupScreen;