import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginScreen.css';

import topfilm from '../data/topfilm.png';
import SignupScreen from './SignupScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const navigate = useNavigate();


  return (
    <div className='loginScreen'>
        <div className='loginScreen_background'>
            <img
                onClick={() => navigate('/')}
                className='loginScreen_logo'
                src={topfilm} 
                alt="" 
            />
            {/* <button
                onClick={() => setSignIn(true) } 
                className='loginScreen_button'
            >
                Sign In
            </button> */}

            <div className='loginScreen_gradient' />
        </div>

        <div className='loginScreen_body'>
            {signIn ? (
                 <SignupScreen />
            ) : (
                <>
                {/* <h2>Watch anywhere. Cancel at any time.</h2> */}
                <h1>Unlimited films, TV programmes and more.</h1>
                <h3>
                    Ready to watch? Enter your email to create or restart your membership.
                </h3>

                <div className='loginScreen_input'>
                    <form>
                        {/* <input 
                            type='email'
                            placeholder='Email Address'
                        /> */}
                        <button 
                            onClick={() => setSignIn(true) } 
                            className='loginScreen_getStarted'
                        >
                            GET STARTED
                        </button>
                    </form>
                </div>
            </>
            )}
        </div>
    </div>
  )
}

export default LoginScreen