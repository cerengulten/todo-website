import React from 'react';
import './Todo.css';

function Todo() {
  return (
    <div className='todo-container' draggable>
      <div className='todo-column'> 
        <div className='column-header'>
          To-Do 
          <hr/>
        </div>
      </div>
      <div className='process-column'>
        <div className='column-header'>
          In Process
          <hr/>
        </div>
      </div>
      <div className='finished-column'>
        <div className='column-header'>
          Accomplished 
          <hr/>
        </div>
      </div>
    </div> 
  )
}

export default Todo