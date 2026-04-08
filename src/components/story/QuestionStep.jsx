import React, { useState } from 'react';

export default function QuestionStep({ step, onCorrectAnswer }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  const handleOptionClick = (index) => {
    setSelected(index);
    if (index === step.correct) {
      setFeedback('correct');
      // Delay so the user can see the correct state
      setTimeout(() => {
        onCorrectAnswer();
      }, 1200);
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div className="story-step animate-fade-up">
      <div className="story-quiz-container">
        <h3 className="quiz-question">{step.question}</h3>
        <div className="quiz-options">
          {step.options.map((option, idx) => {
            let btnClass = "btn-quiz-option";
            if (selected === idx) {
              if (feedback === 'correct') btnClass += " correct animate-pulse-green";
              else if (feedback === 'incorrect') btnClass += " incorrect animate-shake";
            } else if (feedback === 'correct' && idx === step.correct) {
              btnClass += " correct"; // highlight the correct one
            }
            
            return (
              <button
                key={idx}
                className={btnClass}
                onClick={() => handleOptionClick(idx)}
                disabled={feedback === 'correct'}
              >
                {option}
              </button>
            );
          })}
        </div>
        {feedback === 'incorrect' && (
          <p className="quiz-feedback-text text-amber animate-fade-up">
            Not quite! Try again. 🤔
          </p>
        )}
        {feedback === 'correct' && (
          <p className="quiz-feedback-text text-emerald animate-fade-up">
            You got it! 🌟
          </p>
        )}
      </div>
    </div>
  );
}
