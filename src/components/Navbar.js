import React, { useState } from 'react';
import './Navbar.css';
import Switch from '@mui/material/Switch';

function Navbar() {
  const [darkmode, setMode] = useState(false);

  const handleMode = () => {
    setMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      return newMode;
    });
  };
  return (
    <div className='navbar-container'>
      <div className='left-container'>
        <span>Menu</span>
        <span>Today's Date</span>
      </div>
      <div className='right-container'>
        <div className='date-buttons'>
          <button className='button-prev'>Prev. Day</button>
          <button className='button-calender'>Calender</button>
        </div>
        <Switch className='theme-toggle' onChange={handleMode} checked={darkmode}/>
      </div>
    </div>

  )
}

export default Navbar