import React from 'react';
import { useState } from 'react';
import './Todo.css';
import AddIcon from '@mui/icons-material/Add';

function Todo() {
  const [cards, setCards] = useState(DEFAULT_CARDS);
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
  const [active, setActive] = useState(false); /*used for hover the card, booelan */ 
  const filteredCards = cards.filter((c) => c.column === column);
  return(
    <div className='column-container'>
      <div className='header-container'>
        <h3 className='mainHeader' style={{color: headingColor}}>{title}</h3>
        <span className='num-cards'>{filteredCards.length}</span> {/*number of the cards in the column will be in here*/}
      </div>
      <div className={`card ${active ? 'active' : ''}`}>
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c}/>
        })}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards}/>
      </div>
    </div>
  );
};
const Card = ({title, id, column}) =>{
  return(
    <div>
      <DropIndicator beforeId={id} column={column}/>
      <div 
          layout
          layoutId = {id}
          draggable = 'true'
          className='card-container'>
          <p className='card-content'>{title}</p>
      </div>
      
    </div>
    
 
  );
};

const DropIndicator = ({beforeId, column}) =>{
  return(
    <div 
        data-before={beforeId || "-1"}
        data-column={column}
        className='drop-indicator'  />
  );
  };
const AddCard = ({column, setCards}) =>{
  const [text, setText] = useState("")
  const [adding, setAdding] = useState(false)
  return(
    <div>
    {
      adding ? (
        <form>
          <textarea 
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder='Add new task...'
            className='new-task'/>
          <div className='space-buttons'>
            <button
              onClick={() => setAdding(false)}
              className='close-button'>
              Close
            </button>

          </div>
        </form>
      ): (
        <button
              onClick={() => setAdding(true)}
              className='add-button' >
          <span>Add Card</span>
          <AddIcon sx={{ fontSize: 14}}/>
        </button>
      )
    }
    </div>
  );
};

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "todo" },
  { title: "SOX compliance checklist", id: "2", column: "todo" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "todo" },
  { title: "Document Notifications service", id: "4", column: "todo" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "process",
  },
  { title: "Add logging to daily CRON", id: "9", column: "process" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];