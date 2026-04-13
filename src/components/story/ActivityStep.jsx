import React, { useState } from 'react';

export default function ActivityStep({ step, onComplete, onNext }) {
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleSelection = (index) => {
    setSelected(index);
    if (index === step.correct) {
      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setTimeout(() => {
        setShowCorrect(true);
        setTimeout(() => {
          if(onNext) onNext();
        }, 1200);
      }, 1000); // Show correct highlighted after 1s
    }
  };

  return (
    <div className="story-step animate-fade-up">
      <div className="story-activity-container">
        <div className="activity-step-label">🎯 Activity time!</div>
        <h3 className="activity-instruction">{step.instruction}</h3>
        <div className="activity-cards">
          {step.options.map((option, idx) => {
            let cardClass = "activity-card";
            if (selected === idx && success) cardClass += " success animate-pop";
            if (selected === idx && !success && selected !== step.correct) cardClass += " wrong animate-shake";
            if (showCorrect && idx === step.correct) cardClass += " success animate-pop";
            
            return (
              <button
                key={idx}
                className={cardClass}
                onClick={() => handleSelection(idx)}
                disabled={selected !== null}
              >
                <span className="activity-card-text">
                  {((success && idx === step.correct) || (showCorrect && idx === step.correct)) ? "✅ " : ""}{option}
                </span>
              </button>
            );
          })}
        </div>
        {success && (
          <div className="activity-feedback animate-fade-up">
            Awesome job! 🎉
          </div>
        )}
        {selected !== null && !success && (
          <div className="activity-feedback wrong animate-fade-up">
            Hmm, let's look closer...
          </div>
        )}
      </div>
    </div>
  );
}
