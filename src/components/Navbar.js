import React from 'react';
import './Navbar.css';
import Switch from '@mui/material/Switch';

function Navbar() {
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
        <Switch className='theme-toggle'/>
      </div>
    </div>

  )
}

export default Navbar