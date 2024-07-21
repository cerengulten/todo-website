import React, {useState} from 'react';
import './Goals.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Goals() {
  const [open, isOpen] = useState(false);
  const [goalType, setGoalType] = useState(''); // To track whether it's a monthly or weekly goal
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const goal = { text: newGoal, finished: false };
      if (goalType === 'monthly') {
        setMonthlyGoals([...monthlyGoals, goal]);
      } else if (goalType === 'weekly') {
        setWeeklyGoals([...weeklyGoals, goal]);
      }
      setNewGoal('');
      isOpen(false);
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddGoal();
    }
  };

  const toggleGoalDone = (goalType, index) => {
    if (goalType === 'monthly') {
      setMonthlyGoals(monthlyGoals.map((goal, i) =>
        i === index ? { ...goal, finished: !goal.finished } : goal
      ));
    } else if (goalType === 'weekly') {
      setWeeklyGoals(weeklyGoals.map((goal, i) =>
        i === index ? { ...goal, finished: !goal.finished } : goal
      ));
    }
  };

  return (
    <div className='goals-container'>
      <div className='monthly-goals'>
        <div className='montly-header'>
          <h3 className='month-name'>July Goals</h3>
          <button className="add-goal" onClick={() => { isOpen(true); setGoalType('monthly'); }}>
            <AddCircleOutlineIcon fontSize='small' />
          </button>
          
        </div>
        <ul className='list'>
          {monthlyGoals.map((goal, index) => (
            <li key={index} className={goal.finished ? 'finished' : ''} onClick={() => toggleGoalDone('monthly', index)}>
              {goal.text}
            </li>
          ))}
        </ul>
      </div>
      <div className='weekly-goals'>
        <div className='weekly-header'>
          <h3 className='week-name'>Weekly Goals</h3>
          <button className="add-goal" onClick={() => { isOpen(true); setGoalType('weekly'); }}>
            <AddCircleOutlineIcon fontSize='small' />
          </button>
        </div>
        <ul className='list'>
          {weeklyGoals.map((goal, index) => (
            <li key={index} className={goal.finished ? 'finished' : ''} onClick={() => toggleGoalDone('weekly', index)}>
                {goal.text}
              </li>
          ))}
        </ul>
      </div>

      {
        open &&  <Popup
                    newGoal={newGoal}
                    setNewGoal={setNewGoal}
                    handleAddGoal={handleAddGoal}
                    handleKeyPress={handleKeyPress}
                    onClose={() => isOpen(false)}/>
      }

    </div>
  )
};
export default Goals

const Popup = ({ newGoal, setNewGoal, handleAddGoal, handleKeyPress, onClose }) => {
  return (
    <div className='popup-overlay' onClick={onClose}>
      <div className='popup-container' onClick={(e) => e.stopPropagation()}>
        <p>Add your new goal :)</p>
        <textarea 
          type="text" 
          value={newGoal} 
          onChange={(e) => setNewGoal(e.target.value)} 
          onKeyPress={handleKeyPress} 
          autoFocus 
        />
        <button className='add-new' onClick={handleAddGoal}>Add</button>
      </div>
    </div>
  );
};