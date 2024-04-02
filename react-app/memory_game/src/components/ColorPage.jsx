import React, { useState } from 'react';
import '../style/ColorPage.css';

const ColorPage = () => {
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#ffffff'
  ); // Retrieve background color from local storage, default to white if not set

  // Function to change background color and save it in local storage
  const changeColor = (color) => {
    setBackgroundColor(color);
    localStorage.setItem('backgroundColor', color); // Save color in local storage
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
