import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

function Header() {
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#333' // Default background color for the header
  );

  useEffect(() => {
    const storedColor = localStorage.getItem('backgroundColor');
    if (storedColor) {
      setBackgroundColor(storedColor);
    }
  }, []);

  useEffect(() => {
    const updateColor = () => {
      const storedColor = localStorage.getItem('backgroundColor');
      if (storedColor) {
        setBackgroundColor(storedColor);
      }
    };

    const interval = setInterval(updateColor, 1000); // Check for color change every second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="Header-wrapper">
      <div className="Header-background"></div>
      <header className="Header" style={{ backgroundColor: 'rgba(51, 51, 51, 0.9)' }}>
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
    </div>
  );
}

export default Header;
