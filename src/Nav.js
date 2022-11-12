import React, { useEffect, useState } from 'react';
import './Nav.css';

import topfilm from './data/topfilm.png';

function Nav() {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false)
    }
  }

  useEffect (() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar)
  }, []);

  return (
    <div className={`nav ${show && 'nav_black'}`}>
        <div className='nav_contents'>
            <img 
                className='nav_logo'
                src={topfilm}
                alt="" 
            />

            <img 
                className='nav_avatar'
                src="https://i.pinimg.com/736x/c4/88/34/c488340ad56e5454f4576f6c708b63aa.jpg"
                alt=""
            />
        </div>

    </div>
  )
}

export default Nav