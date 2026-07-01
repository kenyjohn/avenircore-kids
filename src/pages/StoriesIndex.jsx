import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { stories } from '../data/stories/index';
import worlds from '../data/worlds';

// Emojis for concepts in List view
const CONCEPT_EMOJIS = {
  'Pattern Recognition': '🔁',
  'AI Decision Making': '🧠',
  'Data Quality': '🕵️',
  'AI Ethics': '🌸',
  'AI Limitations': '🔍',
  'AI Bias & Fairness': '⚖️',
  'AI for Climate & Environment': '🌊',
  'AI Transparency & Hallucination': '🔎',
  'AI in Healthcare & Human Oversight': '🏥',
  'Data Privacy & Digital Rights': '🔐',
  'Machine Learning': '🌙',
  'Sentiment Analysis': '💬',
  'Reinforcement Learning': '🏆',
  'Generative AI & Deepfakes': '🎭',
  'Recommendation Algorithms & Filter Bubbles': '📱',
  'AI & The Future of Work': '🔭',
};

const AGE_FILTERS = [
  { label: 'All Ages', value: 'all' },
  { label: '6–8', value: '6–8' },
  { label: '8–10', value: '8–10' },
  { label: '9–13', value: '9–13' },
  { label: '10–14', value: '10–14' },
  { label: '11–14', value: '11–14' },
];

export default function StoriesIndex() {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [activeAge, setActiveAge] = useState('all');
  const [activeWorld, setActiveWorld] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState('aria');
  const [completedMap, setCompletedMap] = useState(() => {
    const completed = {};
    try {
      stories.forEach(s => {
        const isDone = localStorage.getItem(`avenircore_completed_${s.id}`) === 'true';
        if (isDone) completed[s.id] = true;
      });
    } catch (e) {
      console.error('Failed to load local storage completed stories', e);
    }
    return completed;
  });

  const [starsMap, setStarsMap] = useState(() => {
    const stars = {};
    try {
      stories.forEach(s => {
        const sStars = parseInt(localStorage.getItem(`avenircore_stars_${s.id}`) || '0', 10);
        stars[s.id] = sStars;
      });
    } catch (e) {
      console.error('Failed to load local storage stars', e);
    }
    return stars;
  });

  const [streak, setStreak] = useState(() => {
    try {
      let totalCompleted = 0;
      stories.forEach(s => {
        if (localStorage.getItem(`avenircore_completed_${s.id}`) === 'true') {
          totalCompleted += 1;
        }
      });
      const savedStreak = parseInt(localStorage.getItem('avenircore_streak') || '0', 10);
      return totalCompleted > 0 ? (savedStreak || 1) : 0;
    } catch {
      return 0;
    }
  });

  const navigate = useNavigate();
  const totalCount = stories.length;

  // Compute stats
  const totalStars = useMemo(() => {
    return Object.values(starsMap).reduce((sum, val) => sum + val, 0);
  }, [starsMap]);

  const userLevel = useMemo(() => {
    // Level 1: 0 stars. Level up every 5 stars.
    return Math.floor(totalStars / 5) + 1;
  }, [totalStars]);

  // Compute dynamic completed percent per world
  const worldProgress = useMemo(() => {
    const progress = {};
    worlds.forEach(w => {
      let completedCount = 0;
      w.storyIds.forEach(id => {
        if (completedMap[id]) completedCount += 1;
      });
      const percent = w.storyIds.length > 0 
        ? Math.round((completedCount / w.storyIds.length) * 100) 
        : 0;
      
      // Calculate average stars for the world
      let totalWorldStars = 0;
      w.storyIds.forEach(id => {
        totalWorldStars += starsMap[id] || 0;
      });
      const avgStars = completedCount > 0 
        ? (totalWorldStars / completedCount).toFixed(1) 
        : '0.0';

      progress[w.id] = { percent, completedCount, avgStars };
    });
    return progress;
  }, [completedMap, starsMap]);

  // Reset Progress Handler
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your AvenirCore Universe progress? This will clear all stars and streaks.')) {
      try {
        stories.forEach(s => {
          localStorage.removeItem(`avenircore_completed_${s.id}`);
          localStorage.removeItem(`avenircore_stars_${s.id}`);
        });
        localStorage.removeItem('avenircore_streak');
        localStorage.removeItem('avenircore_last_login_date');
        setCompletedMap({});
        setStarsMap({});
        setStreak(0);
        if (activeWorld) {
          // Refresh details drawer if open
          setActiveWorld(worlds.find(w => w.id === activeWorld.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Helper for List mode overlapping age groups
  const checkAgeOverlap = (storyRange, filterRange) => {
    if (!storyRange) return false;
    const [sMin, sMax] = storyRange.split('–').map(Number);
    const [fMin, fMax] = filterRange.split('–').map(Number);
    return sMin <= fMax && sMax >= fMin;
  };

  // List view filters
  const filtered = useMemo(() => {
    return activeAge === 'all'
      ? stories
      : stories.filter(s => checkAgeOverlap(s.ageRange, activeAge));
  }, [activeAge]);

  const handleWaitlist = () => {
    navigate('/#waitlist');
  };

  const companionTexts = {
    aria: `Hi Leo! I'm Aria 🌟. Welcome to the AvenirCore Universe! We are exploring key AI concepts across different worlds. Click on AI Forest 🌳 to start Day 1: Aria and the Guessing Game!`,
    byte: `BEEP-BOOP! Byte 🤖 is ready! I make mistakes sometimes, but with your help I learn from patterns. Complete lessons to teach me and earn stars!`
  };

  const metaDesc = `Explore ${totalCount} interactive AI literacy stories for children ages 6–14. Teach kids about fairness, privacy, climate, and critical thinking through a gamified learning universe.`;

  return (
    <>
      <Helmet>
        <title>AI Story Library & Learning Universe | AvenirCore</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href="https://avenircore.com/stories" />
      </Helmet>

      {viewMode === 'map' ? (
        // ─── REVAMPED UNIVERSE MAP DASHBOARD (MAP VIEW) ───
        <div className="genesis-body">
          <style>{`
            .genesis-body {
              display: flex;
              min-height: calc(100vh - 80px); /* Adjust for header height */
              background: linear-gradient(135deg, #090615 0%, #120b2d 50%, #05030c 100%);
              color: #ffffff;
              font-family: 'Outfit', 'Inter', system-ui, sans-serif;
              overflow-x: hidden;
            }

            /* Sidebar */
            .genesis-sidebar {
              width: 320px;
              background: rgba(18, 12, 38, 0.6);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border-right: 1px solid rgba(255, 255, 255, 0.08);
              padding: 2.5rem 1.5rem;
              display: flex;
              flex-direction: column;
              gap: 2rem;
              flex-shrink: 0;
            }

            .genesis-profile-card {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 18px;
              padding: 1.25rem;
              display: flex;
              align-items: center;
              gap: 1rem;
            }

            .genesis-avatar-wrapper {
              position: relative;
            }

            .genesis-avatar {
              width: 52px;
              height: 52px;
              border-radius: 50%;
              background: linear-gradient(135deg, #ff7e6b 0%, #ff523d 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              border: 2px solid rgba(255, 255, 255, 0.2);
            }

            .genesis-lvl-badge {
              position: absolute;
              bottom: -4px;
              right: -4px;
              background: #7c3aed;
              color: white;
              font-size: 0.65rem;
              font-weight: 900;
              padding: 0.15rem 0.4rem;
              border-radius: 6px;
              border: 1px solid rgba(255, 255, 255, 0.3);
            }

            .genesis-profile-info {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
            }

            .genesis-profile-name {
              font-weight: 800;
              font-size: 1rem;
              color: #ffffff;
              margin: 0;
            }

            .genesis-profile-stars {
              font-size: 0.8rem;
              color: #ffb800;
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 0.25rem;
            }

            .genesis-sidebar-section {
              display: flex;
              flex-direction: column;
              gap: 0.75rem;
            }

            .genesis-sidebar-title {
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: rgba(255, 255, 255, 0.4);
              font-weight: 700;
              margin: 0 0 0.25rem 0;
            }

            .genesis-streak-card {
              background: rgba(251, 146, 60, 0.08);
              border: 1.5px solid rgba(251, 146, 60, 0.25);
              border-radius: 14px;
              padding: 0.9rem 1rem;
              display: flex;
              align-items: center;
              gap: 0.75rem;
              color: #fdba74;
            }

            .genesis-streak-number {
              font-size: 1.4rem;
              font-weight: 900;
              line-height: 1;
            }

            .genesis-quest-item {
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(255, 255, 255, 0.05);
              border-radius: 12px;
              padding: 0.75rem 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 0.85rem;
            }

            .genesis-leaderboard-list {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }

            .genesis-leader-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem 0.75rem;
              background: rgba(255, 255, 255, 0.02);
              border-radius: 10px;
              font-size: 0.85rem;
            }

            .genesis-leader-rank {
              font-weight: 800;
              color: rgba(255,255,255,0.4);
              width: 20px;
            }

            /* Main map container */
            .genesis-main {
              flex: 1;
              display: flex;
              flex-direction: column;
              padding: 2.5rem 2rem;
              position: relative;
            }

            .genesis-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
              flex-wrap: wrap;
              gap: 1rem;
            }

            .genesis-heading-title {
              font-size: 1.85rem;
              font-weight: 900;
              background: linear-gradient(to right, #fff, #c084fc);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin: 0;
              letter-spacing: -0.01em;
            }

            .genesis-heading-sub {
              font-size: 0.9rem;
              color: rgba(255, 255, 255, 0.5);
              margin: 0.25rem 0 0 0;
            }

            .genesis-map-container {
              flex: 1;
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
              align-items: center;
              max-width: 960px;
              margin: 0 auto;
              width: 100%;
            }

            @media (max-width: 1200px) {
              .genesis-body {
                flex-direction: column;
              }
              .genesis-sidebar {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              }
            }

            @media (max-width: 768px) {
              .genesis-map-container {
                grid-template-columns: 1fr;
              }
            }

            /* Islands cards */
            .genesis-island-card {
              background: rgba(255, 255, 255, 0.02);
              border: 1.5px solid rgba(255, 255, 255, 0.08);
              border-radius: 24px;
              padding: 1.75rem;
              cursor: pointer;
              transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
              position: relative;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.2);
              display: flex;
              flex-direction: column;
              gap: 1.25rem;
            }

            .genesis-island-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 6px;
              background: var(--island-accent, #7c3aed);
            }

            .genesis-island-card:hover {
              transform: translateY(-8px);
              background: rgba(255, 255, 255, 0.04);
              border-color: rgba(255, 255, 255, 0.15);
              box-shadow: 0 12px 30px rgba(124, 58, 237, 0.15);
            }

            .genesis-island-card.active-selected {
              border-color: #c084fc;
              box-shadow: 0 0 25px rgba(167, 139, 250, 0.25);
              background: rgba(167, 139, 250, 0.05);
            }

            .genesis-island-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }

            .genesis-island-title-stack {
              display: flex;
              flex-direction: column;
              gap: 0.2rem;
            }

            .genesis-island-name {
              font-size: 1.3rem;
              font-weight: 800;
              margin: 0;
            }

            .genesis-island-sub {
              font-size: 0.8rem;
              color: rgba(255, 255, 255, 0.5);
              font-weight: 600;
            }

            .genesis-island-emoji {
              font-size: 2.25rem;
              line-height: 1;
            }

            .genesis-island-stats {
              display: flex;
              gap: 1rem;
              align-items: center;
              font-size: 0.8rem;
            }

            .genesis-progress-bar-bg {
              flex: 1;
              height: 8px;
              background: rgba(255,255,255,0.1);
              border-radius: 99px;
              overflow: hidden;
            }

            .genesis-progress-bar-fill {
              height: 100%;
              border-radius: 99px;
              background: var(--island-accent);
              transition: width 0.5s ease-out;
            }

            /* Companion dock */
            .genesis-companion-dock {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 1rem;
              z-index: 50;
              max-width: 420px;
            }

            .genesis-companion-bubble {
              background: rgba(18, 12, 38, 0.9);
              backdrop-filter: blur(12px);
              border: 1.5px solid rgba(167, 139, 250, 0.3);
              border-radius: 20px;
              padding: 1.25rem;
              font-size: 0.875rem;
              line-height: 1.5;
              position: relative;
              box-shadow: 0 8px 32px rgba(0,0,0,0.4);
              animation: floatBubble 4s ease-in-out infinite;
            }

            .genesis-companion-bubble::after {
              content: '';
              position: absolute;
              bottom: -10px;
              right: 36px;
              border-width: 10px 10px 0;
              border-style: solid;
              border-color: rgba(18, 12, 38, 0.9) transparent;
              display: block;
              width: 0;
            }

            .genesis-companion-characters {
              display: flex;
              gap: 1rem;
              align-items: center;
              padding-right: 1.5rem;
            }

            .genesis-char-circle {
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: rgba(255,255,255,0.05);
              border: 2px solid rgba(255,255,255,0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.75rem;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .genesis-char-circle:hover {
              transform: scale(1.1);
            }

            .genesis-char-circle.active {
              border-color: #a78bfa;
              background: rgba(167, 139, 250, 0.15);
              box-shadow: 0 0 15px rgba(167, 139, 250, 0.3);
            }

            .genesis-companion-label {
              font-size: 0.65rem;
              font-weight: 800;
              color: #c084fc;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 0.25rem;
              display: block;
            }

            /* Detail slide-over drawer */
            .genesis-world-detail {
              background: rgba(18, 12, 38, 0.85);
              backdrop-filter: blur(24px);
              -webkit-backdrop-filter: blur(24px);
              border-left: 1px solid rgba(255, 255, 255, 0.08);
              width: 440px;
              height: 100vh;
              position: fixed;
              top: 0;
              right: 0;
              z-index: 100;
              padding: 2.5rem 2rem;
              display: flex;
              flex-direction: column;
              gap: 2rem;
              box-shadow: -10px 0 40px rgba(0,0,0,0.5);
              overflow-y: auto;
            }

            @media (max-width: 480px) {
              .genesis-world-detail {
                width: 100%;
              }
            }

            .genesis-detail-close {
              align-self: flex-start;
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              color: white;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
              cursor: pointer;
              transition: all 0.2s;
            }

            .genesis-detail-close:hover {
              background: rgba(255,255,255,0.1);
              transform: scale(1.05);
            }

            .genesis-detail-header {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }

            .genesis-detail-title {
              font-size: 1.75rem;
              font-weight: 900;
              margin: 0;
            }

            .genesis-detail-desc {
              font-size: 0.9rem;
              color: rgba(255, 255, 255, 0.6);
              line-height: 1.6;
              margin: 0;
            }

            .genesis-adventures-list {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .genesis-adv-card {
              background: rgba(255, 255, 255, 0.02);
              border: 1.5px solid rgba(255, 255, 255, 0.06);
              border-radius: 16px;
              padding: 1.15rem;
              display: grid;
              grid-template-columns: auto 1fr auto;
              align-items: center;
              gap: 1rem;
              transition: all 0.2s;
            }

            .genesis-adv-card.unlocked:hover {
              background: rgba(255, 255, 255, 0.04);
              border-color: rgba(255, 255, 255, 0.12);
            }

            .genesis-adv-icon {
              width: 44px;
              height: 44px;
              border-radius: 12px;
              background: rgba(255, 255, 255, 0.05);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.25rem;
            }

            .genesis-adv-day {
              font-size: 0.75rem;
              font-weight: 700;
              color: var(--island-accent);
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .genesis-adv-title {
              font-size: 0.95rem;
              font-weight: 800;
              margin: 0.15rem 0;
            }

            .genesis-adv-concept {
              font-size: 0.78rem;
              color: rgba(255,255,255,0.4);
            }

            .genesis-adv-type-badge {
              font-size: 0.65rem;
              font-weight: 900;
              text-transform: uppercase;
              padding: 0.25rem 0.6rem;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.08);
              color: rgba(255,255,255,0.7);
            }

            /* Animations */
            @keyframes floatBubble {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }

            @keyframes floatIsland {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
          `}</style>

          {/* ── 1. SIDEBAR ── */}
          <aside className="genesis-sidebar">
            <div className="genesis-profile-card">
              <div className="genesis-avatar-wrapper">
                <div className="genesis-avatar">👦</div>
                <span className="genesis-lvl-badge">Lvl {userLevel}</span>
              </div>
              <div className="genesis-profile-info">
                <h4 className="genesis-profile-name">Leo</h4>
                <div className="genesis-profile-stars">⭐ {totalStars} stars</div>
              </div>
            </div>

            {/* Streaks */}
            <div className="genesis-sidebar-section">
              <h5 className="genesis-sidebar-title">Daily Streak</h5>
              <div className="genesis-streak-card">
                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                <div>
                  <div className="genesis-streak-number">{streak} Days</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Keep learning to keep the flame alive!</div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="genesis-sidebar-section" style={{ marginTop: 'auto' }}>
              <button 
                onClick={handleResetProgress}
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#f87171',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.15)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.08)'}
              >
                Reset Progress
              </button>
            </div>
          </aside>

          {/* ── 2. MAIN MAP ── */}
          <main className="genesis-main">
            <header className="genesis-header">
              <div>
                <h1 className="genesis-heading-title">AvenirCore Universe</h1>
                <p className="genesis-heading-sub">Explore the worlds to play interactive stories and learn AI concepts.</p>
              </div>
              <button
                onClick={() => setViewMode('list')}
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
              >
                🗂️ Classic List View
              </button>
            </header>

            {/* Map Grid */}
            <div className="genesis-map-container">
              {worlds.map((world, index) => {
                const isSelected = activeWorld && activeWorld.id === world.id;
                const stats = worldProgress[world.id] || { percent: 0, completedCount: 0, avgStars: '0.0' };
                return (
                  <div
                    key={world.id}
                    className={`genesis-island-card ${isSelected ? 'active-selected' : ''}`}
                    style={{
                      '--island-accent': world.themeColor,
                      animation: `floatIsland 6s ease-in-out ${index * 0.4}s infinite`
                    }}
                    onClick={() => {
                      setActiveWorld(world);
                    }}
                  >
                    <div className="genesis-island-header">
                      <div className="genesis-island-title-stack">
                        <h3 className="genesis-island-name">{world.title}</h3>
                        <span className="genesis-island-sub">{world.subtitle}</span>
                      </div>
                      <span className="genesis-island-emoji">{world.emoji}</span>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.825rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                      {world.description}
                    </p>

                    <div className="genesis-island-stats">
                      <span style={{ fontWeight: 700, color: 'var(--island-accent)' }}>
                        {stats.percent}% Done
                      </span>
                      <div className="genesis-progress-bar-bg">
                        <div
                          className="genesis-progress-bar-fill"
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                      <span style={{ fontWeight: 700, color: '#ffb800' }}>
                        ⭐ {stats.avgStars}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── 3. COMPANION DOCK ── */}
            <div className="genesis-companion-dock">
              <div className="genesis-companion-bubble">
                <span className="genesis-companion-label">
                  Companion ({selectedCompanion === 'aria' ? 'Aria' : 'Byte'})
                </span>
                {companionTexts[selectedCompanion]}
              </div>

              <div className="genesis-companion-characters">
                <button
                  className={`genesis-char-circle ${selectedCompanion === 'aria' ? 'active' : ''}`}
                  onClick={() => setSelectedCompanion('aria')}
                  title="Speak to Aria"
                >
                  🌟
                </button>
                <button
                  className={`genesis-char-circle ${selectedCompanion === 'byte' ? 'active' : ''}`}
                  onClick={() => setSelectedCompanion('byte')}
                  title="Speak to Byte"
                >
                  🤖
                </button>
              </div>
            </div>

            {/* ── 4. DETAILS SLIDE-OVER DRAWER ── */}
            {activeWorld && (
              <div className="genesis-world-detail" style={{ '--island-accent': activeWorld.themeColor }}>
                <button className="genesis-detail-close" onClick={() => setActiveWorld(null)}>
                  ×
                </button>

                <div className="genesis-detail-header">
                  <span style={{ fontSize: '3rem' }}>{activeWorld.emoji}</span>
                  <h2 className="genesis-detail-title">{activeWorld.title}</h2>
                  <span style={{ color: 'var(--island-accent)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    {activeWorld.subtitle}
                  </span>
                </div>

                <p className="genesis-detail-desc">{activeWorld.description}</p>

                <hr style={{ border: 'none', borderTop: '1.5px solid rgba(255,255,255,0.06)' }} />

                <div>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 800 }}>Adventure Checklist</h4>
                  <div className="genesis-adventures-list">
                    {activeWorld.storyIds.map((id, index) => {
                      const storyObj = stories.find(s => s.id === id);
                      if (!storyObj) return null;
                      const isDone = completedMap[id];
                      const earnedStars = starsMap[id] || 0;
                      return (
                        <div
                          key={id}
                          className="genesis-adv-card unlocked"
                        >
                          <div className="genesis-adv-icon">
                            📖
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <span className="genesis-adv-day" style={{ '--island-accent': activeWorld.themeColor }}>
                              Adventure {index + 1}
                            </span>
                            <h5 className="genesis-adv-title">{storyObj.title}</h5>
                            <span className="genesis-adv-concept">{storyObj.aiConcept}</span>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                            <Link 
                              to={`/stories/${id}`} 
                              className="genesis-adv-type-badge" 
                              style={{ 
                                background: isDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(167, 139, 250, 0.15)', 
                                color: isDone ? '#10b981' : '#c084fc', 
                                textDecoration: 'none',
                                fontWeight: 800
                              }}
                            >
                              {isDone ? 'REPLAY ✓' : 'PLAY →'}
                            </Link>
                            {isDone && (
                              <span style={{ fontSize: '0.7rem', color: '#ffb800', fontWeight: 'bold' }}>
                                {'⭐'.repeat(earnedStars)}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        // ─── ORIGINAL STORIES CATALOG DIRECTORY (CLASSIC LIST VIEW) ───
        <>
          {/* Hero */}
          <div className="stories-hero-section">
            <div className="stories-hero-glow" />
            <div className="container stories-hero-inner">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div className="stories-hero-badge">
                  <span className="stories-badge-dot" />
                  {totalCount} Interactive Stories
                </div>
                <button
                  onClick={() => setViewMode('map')}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)', padding: '0.4rem 1.2rem' }}
                >
                  🌎 Universe Map View
                </button>
              </div>
              
              <h1 className="stories-hero-title" style={{ marginTop: '1.5rem' }}>
                AI Story Library
              </h1>
              <p className="stories-hero-sub">
                Real adventures about fairness, privacy, climate, and critical thinking —
                written to make the next generation curious, not anxious.
              </p>

              {/* Age filter pills */}
              <div className="stories-filter-bar" role="group" aria-label="Filter by age range">
                {AGE_FILTERS.map(f => (
                  <button
                    key={f.value}
                    className={`stories-filter-pill${activeAge === f.value ? ' active' : ''}`}
                    onClick={() => setActiveAge(f.value)}
                    aria-pressed={activeAge === f.value}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Count feedback */}
              <p className="stories-filter-count">
                {filtered.length === totalCount
                  ? `${totalCount} stories available`
                  : `${filtered.length} of ${totalCount} stories`}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="section container">
            {filtered.length === 0 ? (
              <div className="stories-empty">
                <div className="stories-empty-emoji">🔭</div>
                <p>No stories match this filter yet — more coming soon!</p>
                <button className="stories-filter-pill active" onClick={() => setActiveAge('all')}>
                  Show all stories
                </button>
              </div>
            ) : (
              <div className="stories-grid">
                {filtered.map(story => {
                  const conceptEmoji = CONCEPT_EMOJIS[story.aiConcept] || '✨';
                  const isDone = completedMap[story.id];
                  const earnedStars = starsMap[story.id] || 0;
                  return (
                    <Link to={`/stories/${story.id}`} key={story.id} className="story-card" style={{ position: 'relative' }}>
                      {/* New / Completed badge */}
                      {isDone ? (
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 10,
                            background: '#10b981',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            padding: '3px 10px',
                            borderRadius: '99px',
                            textTransform: 'uppercase',
                            pointerEvents: 'none',
                          }}
                        >
                          ✓ Completed {earnedStars > 0 && `(⭐${earnedStars})`}
                        </span>
                      ) : story.isNew && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 10,
                            background: '#16a34a',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            padding: '3px 10px',
                            borderRadius: '99px',
                            textTransform: 'uppercase',
                            pointerEvents: 'none',
                          }}
                        >
                          New
                        </span>
                      )}
                      {/* Banner */}
                      <div
                        className="story-card-banner"
                        style={{ backgroundColor: story.character?.color || 'var(--color-teacher-soft)' }}
                      >
                        <span className="story-card-banner-emoji">{story.character?.emoji}</span>
                        {/* Floating concept badge on banner */}
                        <span className="story-card-concept-float">
                          {conceptEmoji} {story.aiConcept}
                        </span>
                      </div>

                      <div className="story-card-inner">
                        {/* Meta badges */}
                        <div className="story-card-meta">
                          {story.ageRange && (
                            <span className="story-badge-age">Ages {story.ageRange}</span>
                          )}
                          {story.difficulty && (
                            <span className={`story-badge-diff ${story.difficulty.toLowerCase()}`}>
                              {story.difficulty}
                            </span>
                          )}
                        </div>

                        <h3 className="story-card-title">{story.title}</h3>
                        <p className="story-card-desc">{story.description}</p>

                        {/* Step count */}
                        <p className="story-card-steps">
                          {story.steps?.length ?? '?'} steps · {story.character?.name}
                        </p>

                        <div className="story-card-footer">
                          <span className="story-card-cta-link">
                            {isDone ? 'Play again →' : 'Start story →'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Bottom CTA strip */}
            <div className="stories-bottom-strip">
              <div className="stories-bottom-inner">
                <span className="stories-bottom-emoji">📬</span>
                <div>
                  <strong>New stories every month.</strong>
                  <span> Join the waitlist to get them first.</span>
                </div>
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={handleWaitlist}
                >
                  Join free →
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
