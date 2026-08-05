import React from 'react';
import TechniqueCard from './TechniqueCard';

export default function TechniqueGrid({ techniques }) {
  if (techniques.length === 0) {
    return (
      <main className="grid-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748b' }}>Brak technik spełniających kryteria.</p>
      </main>
    );
  }

  return (
    <main className="grid-container">
      <div className="technique-grid">
        {techniques.map((tech) => (
          <TechniqueCard key={tech.id} technique={tech} />
        ))}
      </div>
    </main>
  );
}