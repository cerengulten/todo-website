import React from 'react';
import { useState } from 'react';
import './Todo.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";

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
        <BurnBarrel setCards={setCards}/>
      </div> 
      

  )
}

export default Todo

const Column = ({title, headingColor, cards, column, setCards}) =>{
  const [active, setActive] = useState(false); 
  const handleDragStart = (e, card) =>{
    e.dataTransfer.setData("cardId", card.id);

  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e) =>{
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const clearHighlights = (els) =>{
    const indicators = els || getIndicators();

    indicators.forEach((i) =>{
      i.style.opacity = '0';
    });
  };

  const getNearestIndicator = (e, indicators) => {
  
    // Get the midpoint of the element being dragged
    const draggingRect = e.target.getBoundingClientRect();
    const draggingMidpoint = draggingRect.top + draggingRect.height / 2;
  
    // Find the closest indicator based on the distance to the midpoint
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const midpoint = box.top + box.height / 2;
        const offset = draggingMidpoint - midpoint;
  
        if (Math.abs(offset) < Math.abs(closest.offset)) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.POSITIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
  
    return el;
  };

  const getIndicators = () =>{
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));


  };

  const handleDragLeave = () =>{
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e) =>{
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();

    const {element} = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if(before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if(!cardToTransfer) return;

      cardToTransfer = {...cardToTransfer, column};

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if(moveToBack) {
        copy.push(cardToTransfer);
      } else{
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };
  const filteredCards = cards.filter((c) => c.column === column);
  return(
    <div className='column-container'>
      <div className='header-container'>
        <h3 className='mainHeader' style={{color: headingColor}}>{title}</h3>
        <span className='num-cards'>{filteredCards.length}</span> {/*number of the cards in the column will be in here*/}
      </div>
      <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragEnd}
          className={`selected ${active ? 'active' : ''}`}>
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c}
                  handleDragStart={handleDragStart} />

        })}
        <DropIndicator beforeId='-1' column={column} />
        <AddCard column={column} setCards={setCards}/>
      </div>
    </div>
  );
};
const Card = ({title, id, column, handleDragStart}) =>{
  return(
    <div>
      <DropIndicator beforeId={id} column={column}/>
      <motion.div 
          layout
          layoutId = {id}
          draggable = 'true'
          onDragStart={(e) => handleDragStart(e, {title,id,column})}
          className={`card-container ${column}`}>
          <p className='card-content'>{title}</p>
      </motion.div>
      
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

  const handleSubmit = (e) =>{

    e.preventDefault();

    if(!text.trim().length) return;
    
    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard] );

    setAdding(false);

  };
  return(
    <div>
    {
      adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea 
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder='Add new task...'
            className={`new-task ${column}`}/>
          <div className='space-buttons'>
            <button
              onClick={() => setAdding(false)}
              className='close-button'>
              Close
            </button>
            <button
              type='submit'
              className='newtask-button'>
              <span>Add</span>
              <AddIcon sx={{ fontSize: 14}}/>
            </button>

          </div>
        </motion.form>
      ): (
        <motion.button
              layout
              onClick={() => setAdding(true)}
              className='add-button' >
          <span>Add Card</span>
          <AddIcon sx={{ fontSize: 14}}/>
        </motion.button>
      )
    }
    </div>
  );
};
const BurnBarrel = ({setCards}) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () =>{
    setActive(false);
    
  };
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };
  return(
    <div className='location-delete'>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className='delete-box'>
        {active ? <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24"><path d="M3 8v16h18v-16h-18zm5 12c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm4-15.375l-.409 1.958-19.591-4.099.409-1.958 5.528 1.099c.881.185 1.82-.742 2.004-1.625l5.204 1.086c-.184.882.307 2.107 1.189 2.291l5.666 1.248z"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
        }
      </div>
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