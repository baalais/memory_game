import React, { useState, useEffect } from 'react';
import '../style/Leaderboard.css';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#ffffff'
  ); // Retrieve background color from local storage, default to white if not set

  // Example data for demonstration
  useEffect(() => {
    // Fetch or retrieve player scores from a database or API
    const examplePlayers = [
      { name: 'Player 1', score: 100 },
      { name: 'Player 2', score: 80 },
      { name: 'Player 3', score: 120 },
      // Add more player data as needed
    ];
    
    // Sort players by score in descending order
    const sortedPlayers = examplePlayers.sort((a, b) => b.score - a.score);
    
    // Update state with sorted players
    setPlayers(sortedPlayers);
  }, []);

  return (
    <div className="leaderboard-container" style={{ backgroundColor }}>
      <h1>Leaderboard</h1>
      <ol>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score} points
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
