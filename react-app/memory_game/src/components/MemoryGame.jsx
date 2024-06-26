import React, { useState, useEffect } from 'react';
import styles from '../style/MemoryGame.css'; // Import CSS module for card styles

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [hasStarted, setHasStarted] = useState(false); // Add hasStarted state
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#ffffff'
  ); // Retrieve background color from local storage, default to white if not set
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false); 

  useEffect(() => {
    generateCards();
  }, [level]); // Generate cards when level changes

  useEffect(() => {
    if (hasStarted && solved.length === cards.length) {
      goToNextLevel();
    }
  }, [solved, hasStarted]); // Transition to next level when all cards are solved

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor); // Store selected background color in local storage
  }, [backgroundColor]); // Update local storage when backgroundColor changes

  const generateCards = () => {
    const faces = ['🍎', '🍌', '🍒', '🍇', '🍓', '🍍', '🍑', '🍉', '🍏', '🍆'];
    const numPairs = level; // Number of pairs is equal to the level
    const duplicatedFaces = [];
    
    // Duplicate each face to create pairs
    for (let i = 0; i < numPairs; i++) {
      duplicatedFaces.push(faces[i % faces.length]);
      duplicatedFaces.push(faces[i % faces.length]);
    }
    
    const shuffledFaces = duplicatedFaces.sort(() => Math.random() - 0.5);
    setCards(shuffledFaces);
    setFlipped(Array(numPairs * 2).fill(false)); // Initialize flipped state for each card
    setDisabled(false); // Enable card clicking
    setHasStarted(true); // Start the game
  };
  

  const handleCardClick = (index) => {
    if (disabled || solved.includes(index)) return;
  
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  
    const flippedIndices = newFlipped.reduce((acc, isFlipped, idx) => {
      if (isFlipped) acc.push(idx);
      return acc;
    }, []);
  
    if (flippedIndices.length === 2) {
      setDisabled(true);
  
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        // If the cards match, mark them as solved and increment points
        setSolved([...solved, firstIndex, secondIndex]);
        setPoints(points + 1); // Increment points
        setFlipped(Array(cards.length).fill(false));
        setDisabled(false);
      } else {
        setTimeout(() => {
          // Reset the flipped state after a delay
          const resetFlipped = [...newFlipped];
          resetFlipped[firstIndex] = false;
          resetFlipped[secondIndex] = false;
          setFlipped(resetFlipped);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setTimer(60); // Reset timer when level changes
  }, [level]);
  
  const goToNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1); // Increment the level
    setSolved([]); // Reset the solved cards
    setFlipped(Array(cards.length).fill(false)); // Reset the flipped cards
  };

  const getCardClass = (index) => {
    let className = styles.card; // Use CSS module for card styles
    if (flipped[index]) className += ` ${styles.flipped}`; // Use CSS module for flipped card styles
    if (solved.includes(index)) className += ` ${styles.solved}`; // Use CSS module for solved card styles
    return className;
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setGameOver(true); // End the game when timer reaches 0
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (gameOver) {
    // Inside the MemoryGame component's return statement
return (
  <div className={'MemoryGame'} style={{ backgroundColor }}>
    <div className={'fullscreen-background'}></div>
    {gameOver && (
      <div className="gameOverMessage">
        Game Over! Your score is: {points}
      </div>
    )}
    {!gameOver && (
      <div className={'gameInfo'}>
        <div>Timer: {timer}</div>
        <div>Level: {level}</div>
        <div>Points: {points}</div>
      </div>
    )}
    <div className={'cards'}>
      {/* Render cards */}
    </div>
  </div>
);

     // Display game over message and score
  }

  return (
    <div className={'MemoryGame'} style={{ backgroundColor }}>
      <div className={'fullscreen-background'}></div>
      <div className={'gameInfo'}>
      <div>Timer: {timer}</div>
        <div>Level: {level}</div>
        <div>Points: {points}</div>
      </div>
      <div className={'cards'}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped[index] || solved.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className={'card-inner'}>
              <div className={'card-front'}>?</div>
              <div className={'card-back'}>{flipped[index] || solved.includes(index) ? card : '?'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
