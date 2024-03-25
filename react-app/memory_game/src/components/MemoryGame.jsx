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
    const numCards = level * 2; // Increase the number of cards with each level
    const duplicatedFaces = [...faces, ...faces.slice(0, numCards - faces.length)];
    const shuffledFaces = duplicatedFaces.sort(() => Math.random() - 0.5);
    setCards(shuffledFaces);
    setFlipped(Array(numCards).fill(false)); // Initialize flipped state for each card
    setDisabled(false); // Enable card clicking
    setHasStarted(true); // Start the game
  };

  const handleCardClick = (index) => {
    if (disabled || solved.includes(index)) return; // Ignore clicks on disabled or solved cards
    
    // Toggle the flipped state of the clicked card
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  
    // Check for matching cards if two cards are flipped
    if (newFlipped.filter((isFlipped) => isFlipped).length === 2) {
      setDisabled(true); // Disable clicking until the check is complete
      const [firstIndex, secondIndex] = newFlipped.reduce((acc, isFlipped, idx) => {
        if (isFlipped) acc.push(idx);
        return acc;
      }, []);
      if (cards[firstIndex] === cards[secondIndex]) {
        // If the cards match, mark them as solved
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped(Array(cards.length).fill(false)); // Reset flipped cards
        setDisabled(false); // Re-enable clicking
      } else {
        setTimeout(() => {
          // Reset the flipped state after a delay
          setFlipped(Array(cards.length).fill(false));
          setDisabled(false); // Re-enable clicking
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
    <div className={style.MemoryGame}>
      <div className={style['game-info']}>
        <div>Level: {level}</div>
        <div>Points: {points}</div>
      </div>
      <div className={style.cards}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${style.card} ${flipped[index] || solved.includes(index) ? style.flipped : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className={style['card-inner']}>
              <div className={style['card-front']}>?</div>
              <div className={style['card-back']}>{flipped[index] || solved.includes(index) ? card : '?'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default MemoryGame;
