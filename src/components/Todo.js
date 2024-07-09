import React from 'react';
import { useState } from 'react';
import './Todo.css';
import { color } from '@mui/system';

function Todo() {
  const [cards, setCards] = useState();
  return (
    <div className='todo-container'>
      <Column 
            title='To-Do'
            column='todo'
            headingColor='#073b4c'
            cards={cards}
            setCards={setCards}/>
      <Column
             title='Process'
             column='process'
             headingColor='#ffd166'
             cards={cards}
             setCards={setCards}/>
      <Column  
            title='Finished'
            column='done'
            headingColor='#06d6a0'
            cards={cards}
            setCards={setCards}/>
    </div> 
  )
}

export default Todo

const Column = ({title, headingColor, cards, column, setCards}) =>{
  return(
    <div className='column-container'>
      <div className='header-container'>
        <h3 className='mainHeader' style={{color: headingColor}}>{title}</h3>
        <span className='num-cards'>3</span> {/*number of the cards in the column will be in here*/}
      </div>
    </div>
  );

};