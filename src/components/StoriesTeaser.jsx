import React from 'react';
import { Link } from 'react-router-dom';
import { stories } from '../data/stories';

export default function StoriesTeaser() {
  return (
    <section id="stories-preview" className="section bg-white" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Available Now · Free</span>
          <h2 className="section-title">Start Learning with AI Stories</h2>
          <p className="section-sub">
            Five bite-sized adventures that teach your child how AI works — through stories, questions, and activities. No screen time guilt. Just curious kids.
          </p>
        </div>

        <div className="stories-teaser-scroll">
          {stories.map((story, i) => (
            <Link to={`/stories/${story.id}`} key={story.id} className="story-card teaser-card text-decoration-none animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="story-card-inner">
                <div className="story-card-meta">
                  {story.character && <span className="story-badge-character" style={{backgroundColor: story.character.color || 'var(--color-navy)'}}>{story.character.emoji}</span>}
                  {story.ageRange && <span className="story-badge-age">{story.ageRange}</span>}
                  {story.aiConcept && <span className="story-badge-diff">{story.aiConcept}</span>}
                </div>
                <h3 className="story-card-title">{story.title}</h3>
                <div className="story-card-action mt-auto pt-3">
                  <span className="btn btn-outline" style={{width: '100%'}}>Start Story &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/stories" className="btn btn-primary btn-lg">See All Stories &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
