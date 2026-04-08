import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StoryStep from './StoryStep';
import QuestionStep from './QuestionStep';
import ActivityStep from './ActivityStep';
import { getStoryById } from '../../data/stories';

export default function StoryPlayer() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [score, setScore] = useState(0); // Track successful quiz/activities
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // In a real app, you might fetch this based on the ID.
    // Here we load from our local JSON array.
    const foundStory = getStoryById(id);
    if (foundStory) {
      setStory(foundStory);
      setCurrentStepIdx(0);
      setScore(0);
      setIsCompleted(false);
    }
  }, [id]);

  if (!story) {
    return (
      <div className="section container story-not-found">
        <h2>Story not found</h2>
        <Link to="/stories" className="btn btn-primary mt-2">Back to Stories</Link>
      </div>
    );
  }

  const step = story.steps[currentStepIdx];
  const progressPercent = ((currentStepIdx) / story.steps.length) * 100;

  const handleNext = () => {
    if (currentStepIdx < story.steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleCorrectAction = () => {
    setScore(score + 1);
    handleNext();
  };

  const renderStep = () => {
    if (step.type === 'story') {
      return <StoryStep step={step} onNext={handleNext} />;
    } else if (step.type === 'question') {
      return <QuestionStep step={step} onCorrectAnswer={handleCorrectAction} />;
    } else if (step.type === 'activity') {
      return <ActivityStep step={step} onComplete={handleCorrectAction} />;
    }
    return null;
  };

  if (isCompleted) {
    return (
      <div className="story-player-container container section animate-fade-up">
        <div className="story-completed-card">
          <div className="story-emoji-large">🎉</div>
          <h2 className="story-completed-title">You did it!</h2>
          <p className="story-completed-text">
            You finished <strong>{story.title}</strong>!
          </p>
          <p className="story-completed-score">
            You scored: {score} stars 🌟
          </p>
          <div className="story-completed-actions">
            <Link to="/stories" className="btn btn-primary btn-lg">Pick Another Story</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-player-container container section">
      <div className="story-player-header">
        <Link to="/stories" className="story-back-link">&larr; Back to Stories</Link>
        <h2 className="story-player-title">{story.title}</h2>
        <div className="story-progress-bar">
          <div className="story-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="story-step-wrapper">
        {renderStep()}
      </div>
    </div>
  );
}
