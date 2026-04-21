import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import StoryStep from './StoryStep';
import QuestionStep from './QuestionStep';
import ActivityStep from './ActivityStep';
import { getStoryById } from '../../data/stories';
import ContentGate from '../ContentGate';

export default function StoryPlayer() {
  const { id } = useParams();
  const [story, setStory] = useState(() => getStoryById(id));
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [score, setScore] = useState(0); 
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // When ID changes, we need to refresh the story if the component wasn't remounted.
    // However, if we use a 'key' in the parent, this component will remount naturally.
    // For safety, we update if id changes but foundStory differs.
    const foundStory = getStoryById(id);
    if (foundStory && (!story || foundStory.id !== story.id)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStory(foundStory);
      setCurrentStepIdx(0);
      setScore(0);
      setIsCompleted(false);
    }
  }, [id, story]);


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
      return <QuestionStep step={step} onCorrectAnswer={handleCorrectAction} onNext={handleNext} />;
    } else if (step.type === 'activity') {
      return <ActivityStep step={step} onComplete={handleCorrectAction} onNext={handleNext} />;
    }
    return null;
  };

  const seoMetadata = (
    <Helmet>
      <title>{story.title} | AI Literacy Story | AvenirCore</title>
      <meta name="description" content={`${story.description} An interactive AI literacy story for ages ${story.ageRange}. Free at AvenirCore.`} />
      <link rel="canonical" href={`https://avenircore.com/stories/${story.id}`} />
      <meta property="og:title" content={`${story.title} | AvenirCore`} />
      <meta property="og:description" content={story.description} />
      <meta property="og:url" content={`https://avenircore.com/stories/${story.id}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://avenircore.com/avenircore-og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@avenircore" />
      <meta name="twitter:title" content={`${story.title} | AvenirCore`} />
      <meta name="twitter:description" content={story.description} />
      <meta name="twitter:image" content="https://avenircore.com/avenircore-og-image.png" />
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

  const handleReplay = () => {
    setCurrentStepIdx(0);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const stars = score >= 2 ? 3 : score === 1 ? 2 : 1;

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
            <span className="story-card-banner-emoji">🧠</span> What you learned today: {story.aiConcept}
          </div>
          <div className="story-stars">
            {Array(stars).fill(0).map((_, i) => (
              <span key={i} className="story-star">⭐</span>
            ))}
          </div>
          <div className="story-completed-actions mt-2">
            <button className="btn-replay-story" onClick={handleReplay}>Play again</button>
            <Link to="/stories" className="btn-next-story">Pick Another Story</Link>
          </div>
        </div>

        <div className="story-end-cta">
          <div className="story-end-cta-inner">
            <p className="story-end-cta-text">
              Enjoyed this story? There are 10 more in the library.
            </p>
            <div className="story-end-actions">
              <Link to="/stories" className="btn btn-primary">
                Explore all stories →
              </Link>
              <Link to="/#waitlist" className="btn btn-outline">
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Teaser: always visible even when gated
  const teaser = (
    <div className="story-player-container container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      {seoMetadata}
      <div className="story-player-header">
        <div className="story-player-nav">
          <Link to="/stories" className="story-back-link">&larr; Back to Stories</Link>
          <span className="story-step-counter">{story.steps.length} steps · {story.ageRange}</span>
        </div>
        <h2 className="story-player-title">
          {story.character?.emoji && <span style={{marginRight: '0.5rem'}}>{story.character.emoji}</span>}
          {story.title}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
          {story.description}
        </p>
      </div>
    </div>
  );

  return (
    <ContentGate contentType="story" teaser={teaser}>
      <div className="story-player-container container section">
        <div className="story-player-header">
          <div className="story-player-nav">
            <Link to="/stories" className="story-back-link">&larr; Back to Stories</Link>
            <span className="story-step-counter">Step {currentStepIdx} of {story.steps.length}</span>
          </div>
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
    </ContentGate>
  );
}
