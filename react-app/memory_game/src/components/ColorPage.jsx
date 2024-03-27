// ColorPage.jsx

import React, { useState } from 'react';
import '../style/ColorPage.css';

const ColorPage = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Sākuma fona krāsa - balta
  
  // Funkcija, kas maina fona krāsu
  const changeColor = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="color-page" style={{ backgroundColor }}>
      <h1>Maini fona krāsu</h1>
      <div className="color-buttons">
        <button onClick={() => changeColor('#ffffff')}>Balta</button>
        <button onClick={() => changeColor('#000000')}>Melna</button>
        <button onClick={() => changeColor('#ff0000')}>Sarkana</button>
        <button onClick={() => changeColor('#00ff00')}>Zaļa</button>
        <button onClick={() => changeColor('#0000ff')}>Zila</button>
      </div>
    </div>
  );
};

export default ColorPage;
