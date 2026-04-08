import React from 'react';
import { Link } from 'react-router-dom';
import { stories } from '../data/stories';

export default function StoriesIndex() {
  return (
    <div className="section container pages-animate">
      <div className="stories-header">
        <h1 className="stories-title">AI Story Library</h1>
        <p className="stories-subtitle">Choose an interactive adventure to learn about AI!</p>
      </div>
      
      <div className="stories-grid">
        {stories.map(story => (
          <Link to={`/stories/${story.id}`} key={story.id} className="story-card text-decoration-none">
            <div className="story-card-inner">
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
