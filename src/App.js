import { useState } from 'react';
import Intro from './pages/Intro';
import PlayerBoard from './pages/PlayerBoard';
import './App.css';

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [players, setPlayers] = useState([]);

  return (
    <div className="App">
      {isGameRunning 
        ? <PlayerBoard players={players} setPlayers={setPlayers} /> 
        : <Intro players={players} setIsGameRunning={setIsGameRunning} setPlayers={setPlayers} /> 
      }
    </div>
  );
}

export default App;
