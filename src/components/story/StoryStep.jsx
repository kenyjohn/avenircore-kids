import React from 'react';

export default function StoryStep({ step, onNext }) {
  return (
    <div className="story-step animate-fade-up">
      <div className="story-content-box">
        <p className="story-text">{step.content}</p>
      </div>
      <div className="story-actions">
        <button className="btn btn-primary btn-lg" onClick={onNext}>
          Next <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
