import React, { useState } from 'react';

export default function ActivityStep({ step, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSelection = (index) => {
    setSelected(index);
    if (index === step.correct) {
      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="story-step animate-fade-up">
      <div className="story-activity-container">
        <h3 className="activity-instruction">{step.instruction}</h3>
        <div className="activity-cards">
          {step.options.map((option, idx) => {
            let cardClass = "activity-card";
            if (selected === idx && success) cardClass += " success animate-bounce-short";
            if (selected === idx && !success && selected !== step.correct) cardClass += " wrong animate-shake";
            
            return (
              <button
                key={idx}
                className={cardClass}
                onClick={() => handleSelection(idx)}
                disabled={success}
              >
                <span className="activity-card-text">{option}</span>
              </button>
            );
          })}
        </div>
        {success && (
          <div className="activity-feedback animate-fade-up">
            Awesome job! 🎉
          </div>
        )}
        {selected !== null && selected !== step.correct && !success && (
          <div className="activity-feedback wrong animate-fade-up">
            Hmm, let's look closer... Try another one!
          </div>
        )}
      </div>
    </div>
  );
}
