import React, { useState } from 'react';
import BudgetApp from './Components/BudgetApp';
import SettingsPanel from './Components/settingspanel';
import './App.css';

const App = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowSettings(!showSettings)}>
        {showSettings ? 'Hide Settings' : 'Show Settings'}
      </button>
      {showSettings && <SettingsPanel />}
      <BudgetApp />
    </div>
  );
};

export default App;



