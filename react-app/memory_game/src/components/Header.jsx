import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

function Header() {
  return (
    <header className="Header">
      <h1>Memory Game</h1>
      <div className="Header-buttons">
        <Link to="/ProfilePage">
          <button>Profile</button>
        </Link>
        <Link to="/MemoryGame">
          <button>Game</button>
        </Link>
        <Link to="/Leaderboard">
          <button>Leaderboard</button>
        </Link>
        <Link to="/ColorPage">
          <button>Color</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
