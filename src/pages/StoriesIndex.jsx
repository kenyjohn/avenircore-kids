import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { stories } from '../data/stories';

export default function StoriesIndex() {
  return (
    <div className="section container pages-animate">
      <Helmet>
        <title>AI Story Library for Kids | AvenirCore</title>
        <meta name="description" content="Explore AvenirCore's library of 5 interactive AI literacy stories for children ages 6-10. Teach kids about pattern recognition, AI ethics, and data quality through play." />
      </Helmet>
      <div className="stories-header">
        <h1 className="stories-title">AI Story Library</h1>
        <p className="stories-subtitle">Choose an interactive adventure to learn about AI!</p>
        <div style={{marginTop: '1rem'}}><span className="story-count-badge">5 Stories</span></div>
      </div>
      
      <div className="stories-grid">
        {stories.map(story => (
          <Link to={`/stories/${story.id}`} key={story.id} className="story-card text-decoration-none">
            <div className="story-card-inner">
              <div className="story-card-meta">
                {story.character && <span className="story-badge-character" style={{backgroundColor: story.character.color || 'var(--color-navy)'}}>{story.character.emoji}</span>}
                {story.ageRange && <span className="story-badge-age">{story.ageRange}</span>}
                {story.difficulty && <span className={`story-badge-diff ${story.difficulty.toLowerCase()}`}>{story.difficulty}</span>}
              </div>
              <h3 className="story-card-title">{story.title}</h3>
              <p className="story-card-desc">{story.description}</p>
              <div className="story-card-action">
                <span className="btn btn-outline">Read Story &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
