import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TechniqueGrid from './components/TechniqueGrid';
import './App.css'; 

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedGi, setSelectedGi] = useState('Wszystkie');
  const [selectedPosition, setSelectedPosition] = useState('Wszystkie');



  return (
    <div className="app-container">
      <Sidebar
        search={search}
        setSearch={setSearch}
        selectedGi={selectedGi}
        setSelectedGi={setSelectedGi}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
      />
      </div>
  );
}