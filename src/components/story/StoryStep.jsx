import React from 'react';

export default function StoryStep({ step, onNext, character }) {
  return (
    <div className="story-step animate-fade-up">
      <div className="story-content-box">
        {character && (
          <div className="story-character-bubble" style={{ backgroundColor: character.color || 'var(--color-navy)' }}>
            {character.emoji}
          </div>
        )}
        <p className="story-text">{step.content}</p>
      </div>
      <div className="story-actions">
        <button className="story-next-btn" onClick={onNext}>
          Continue <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
