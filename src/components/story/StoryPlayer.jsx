import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      return <StoryStep step={step} onNext={handleNext} character={story.character} />;
    } else if (step.type === 'question') {
      return <QuestionStep step={step} onCorrectAnswer={handleCorrectAction} />;
    } else if (step.type === 'activity') {
      return <ActivityStep step={step} onComplete={handleCorrectAction} />;
    }
    return null;
  };

  const seoMetadata = (
    <Helmet>
      <title>{story.title} — AI Story for Kids | AvenirCore</title>
      <meta name="description" content={`${story.description} A free interactive AI literacy story for children ages ${story.ageRange}.`} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          "name": story.title,
          "description": story.description,
          "educationalLevel": "Primary",
          "teaches": story.aiConcept,
          "typicalAgeRange": story.ageRange,
          "provider": {
            "@type": "Organization",
            "name": "AvenirCore",
            "url": "https://avenircore.com"
          }
        })}
      </script>
    </Helmet>
  );

  if (isCompleted) {
    return (
      <div className="story-player-container container section animate-fade-up">
        {seoMetadata}
        <div className="story-completed-card">
          <div className="story-emoji-large">🎉</div>
          <h2 className="story-completed-title">You did it!</h2>
          <p className="story-completed-text">
            You finished <strong>{story.title}</strong>!
          </p>
          <div className="story-concept-badge">
            What you learned today: <strong>{story.aiConcept}</strong>
          </div>
          <p className="story-completed-score mt-2">
            You scored: {score} stars 🌟
          </p>
          <div className="story-completed-actions mt-2">
            <Link to="/stories" className="btn btn-primary btn-lg">Pick Another Story</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-player-container container section">
      {seoMetadata}
      <div className="story-player-header">
        <Link to="/stories" className="story-back-link">&larr; Back to Stories</Link>
        <h2 className="story-player-title">
          {story.character?.emoji && <span style={{marginRight: '0.5rem'}}>{story.character.emoji}</span>}
          {story.title}
        </h2>
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
