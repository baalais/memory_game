import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/GameHistory.css';

function GameHistory() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Iegūstam lietotāja spēlēto spēļu vēsturi no backend API
    axios.get('/api/game-history')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch game history:', error);
      });
  }, []);

  return (
    <div>
      <h1>Game History</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <strong>Game ID:</strong> {game.id}, <strong>Date:</strong> {game.date}, <strong>Score:</strong> {game.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
