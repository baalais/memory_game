import React, { useState, useEffect } from 'react';
import style from '../style/MemoryGame.css'; // Import CSS module for card styles

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [hasStarted, setHasStarted] = useState(false); // Add hasStarted state

  useEffect(() => {
    generateCards();
  }, [level]); // Generate cards when level changes

  useEffect(() => {
    if (hasStarted && solved.length === cards.length) {
      goToNextLevel();
    }
  }, [solved, hasStarted]); // Transition to next level when all cards are solved

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
  
  

  const goToNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1); // Increment the level
    setSolved([]); // Reset the solved cards
    setFlipped(Array(cards.length).fill(false)); // Reset the flipped cards
  };

  const getCardClass = (index) => {
    let className = style.card; // Use CSS module for card styles
    if (flipped[index]) className += ` ${style.flipped}`; // Use CSS module for flipped card styles
    if (solved.includes(index)) className += ` ${style.solved}`; // Use CSS module for solved card styles
    return className;
  };

  return (
    <div className={'MemoryGame'}>
      <div className={'gameInfo'}>
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
