import React, { useState, useEffect } from 'react';
import '../style/ColorPage.css';

const ColorPage = () => {
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#ffffff'
  ); // Retrieve background color from local storage, default to white if not set

  // Function to handle color change and save it in local storage
  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
    localStorage.setItem('backgroundColor', e.target.value); // Save color in local storage
  };

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor);
  }, [backgroundColor]);

  return (
    <div className="color-page" style={{ backgroundColor }}>
      <h1>Maini fona krāsu</h1>
      <div className="color-selector">
        <input
          type="color"
          value={backgroundColor}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default ColorPage;
