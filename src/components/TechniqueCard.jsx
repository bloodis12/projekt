import React from 'react';

export default function TechniqueCard({ technique }) {
  return (
    <div className="card">
      <div className="card-media">
        {technique.videoUrl ? (
          <iframe src={technique.videoUrl} title={technique.title} allowFullScreen />
        ) : (
          <span>🎥 Brak wideo</span>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{technique.title}</h3>
        
        <div className="badges">
          <span className="badge">{technique.position}</span>
          <span className="badge type">{technique.type}</span>
          <span className="badge gi">{technique.gi}</span>
        </div>

        <div className="card-footer">
          <span>Skuteczność:</span>
          <span className="stars">{'★'.repeat(technique.rating)}</span>
        </div>
      </div>
    </div>
  );
}