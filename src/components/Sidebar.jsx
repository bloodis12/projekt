import React from 'react';

export default function Sidebar({ search, setSearch, selectedGi, setSelectedGi, selectedPosition, setSelectedPosition }) {
  const positions = ['Wszystkie', 'Guard', 'Side Control', 'Mount', 'Back Control', 'Stójka'];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Szukajka */}
        <div className="filter-group">
          <label>Szukaj</label>
          <input
            type="text"
            placeholder="Np. Triangle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Gi / No-Gi */}
        <div className="filter-group">
          <label>Ubiór</label>
          <div className="btn-group">
            {['Wszystkie', 'Gi', 'No-Gi'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedGi(mode)}
                className={`btn-filter ${selectedGi === mode ? 'active' : ''}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Pozycje */}
        <div className="filter-group">
          <label>Pozycja</label>
          <div className="position-list">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`btn-position ${selectedPosition === pos ? 'active' : ''}`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="btn-add">➕ Dodaj Technikę</button>
    </aside>
  );
}