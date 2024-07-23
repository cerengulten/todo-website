import './App.css';
import Goals from './components/Goals';
import Navbar from './components/Navbar';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
        <div className='main-block'>
          <Goals/>
          <Todo/>
        </div>
    </div>
  );
}

export default App;
