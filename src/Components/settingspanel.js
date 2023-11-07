import React, { useState } from 'react';

const SettingsPanel = () => {
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    // Apply color changes to components or elements in your app
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    // Apply font size changes to components or elements in your app
  };

  return (
    <div className="settings-panel">
      <h2>Customize Your App</h2>
      <label htmlFor="colorPicker">Choose a Color:</label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
      />
      <label htmlFor="fontSizeRange">Font Size:</label>
      <input
        type="range"
        id="fontSizeRange"
        min="12"
        max="24"
        step="1"
        value={fontSize}
        onChange={(e) => handleFontSizeChange(e.target.value)}
      />
      {/* Add more customization options here */}
    </div>
  );
};

export default SettingsPanel;

