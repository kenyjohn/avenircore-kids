import React, { useState } from 'react';

export default function QuestionStep({ step, onCorrectAnswer, onNext }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  const handleOptionClick = (index) => {
    setSelected(index);
    if (index === step.correct) {
      setFeedback('correct');
      // Correct answer auto-advances after 1.4s
      setTimeout(() => {
        onCorrectAnswer();
      }, 1400);
    } else {
      setFeedback('incorrect');
      // Wrong answer shows correct answer highlighted, advances after 2.2s
      setTimeout(() => {
        if (onNext) onNext();
      }, 2200);
    }
  };

  return (
    <div className="story-step animate-fade-up">
      <div className="story-quiz-container">
        <div className="quiz-step-label">Quick question</div>
        <h3 className="quiz-question">{step.question}</h3>
        <div className="quiz-options">
          {step.options.map((option, idx) => {
            let btnClass = "btn-quiz-option";
            if (selected === idx) {
              if (feedback === 'correct') btnClass += " correct animate-pulse-green";
              else if (feedback === 'incorrect') btnClass += " incorrect animate-shake";
            } else if (feedback === 'correct' && idx === step.correct) {
              btnClass += " correct"; // highlight the correct one
            } else if (feedback === 'incorrect' && idx === step.correct) {
              btnClass += " correct"; // wrong answer selected, still highlight correct
            }
            
            const letter = String.fromCharCode(65 + idx); // A, B, C, D...

            return (
              <button
                key={idx}
                className={btnClass}
                onClick={() => handleOptionClick(idx)}
                disabled={feedback !== null}
              >
                <span className="quiz-option-letter">{letter}</span>
                {option}
              </button>
            );
          })}
        </div>
        {feedback === 'incorrect' && (
          <p className="quiz-feedback-text text-amber animate-fade-up">
            Not quite! Moving on... 🤔
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
