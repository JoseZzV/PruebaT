import React, { useState, useEffect } from 'react';
import './App.css';

interface Player {
  first_name: string;
  last_name: string;
  h_in: string;
}

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [pairs, setPairs] = useState<string[]>([]);

  
  useEffect(() => {
    fetch('/respuesta.json')
      .then(response => response.json())
      .then(data => setPlayers(data.values))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  
  const findPairs = () => {
    const heightMap = new Map<number, string>();
    const result: string[] = [];

    players.forEach(player => {
      const height = parseInt(player.h_in, 10);
      const complement = targetHeight - height;
      if (heightMap.has(complement)) {
        result.push(`${heightMap.get(complement)} & ${player.first_name} ${player.last_name}`);
      }
      heightMap.set(height, `${player.first_name} ${player.last_name}`);
    });

    if (result.length === 0) {
      result.push('No matches found');
    }

    setPairs(result);
  };

  return (
    <div className="App">
      <h1>NBA Height Pair Finder</h1>
      <input
        type="number"
        value={targetHeight}
        onChange={(e) => setTargetHeight(Number(e.target.value))}
        placeholder="Enter target height"
      />
      <button onClick={findPairs}>Find Pairs</button>
      <ul>
        {pairs.map((pair, index) => (
          <li key={index}>{pair}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;