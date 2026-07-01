import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { stories } from '../data/stories/index';
import worlds from '../data/worlds';
import companions from '../data/characters';

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
  const [explorerCompanion, setExplorerCompanion] = useState(null);
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

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('avenircore_universe_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('avenircore_universe_theme', nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

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
    byte: `BEEP-BOOP! Byte 🤖 is ready! I make mistakes sometimes, but with your help I learn from patterns. Complete lessons to teach me and earn stars!`,
    nova: `Greetings, learner! I am Nova 🦉. I study neural networks, algorithms, and deep coding logic. Together, we will make difficult AI concepts simple to understand!`,
    pixel: `Meow! Pixel 🐱 is here! I am so excited to press all the buttons! Wait, did I just trigger a glitch? Oops... let's learn how AI systems handle limits and errors!`,
    echo: `Hello there! I am Echo 🦊. I care about fairness, privacy, and truth. When we build or use AI, we must always ask: is this safe, and is it fair?`,
    spark: `Zoom! Spark 🚀 ready for action! I love creating, drawing, and designing smart models. Let's build some amazing creations today!`
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
        <div className={`genesis-body genesis-theme-${theme}`}>
          <style>{`
            .genesis-body {
              display: flex;
              min-height: calc(100vh - 80px); /* Adjust for header height */
              overflow-x: hidden;
            }

            /* Theme-specific Overrides */
            .genesis-theme-dark {
              background: linear-gradient(135deg, #090615 0%, #120b2d 50%, #05030c 100%);
              color: #ffffff;
            }

            .genesis-theme-light {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
              color: #1e293b;
            }

            /* Sidebar */
            .genesis-sidebar {
              width: 320px;
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              padding: 2.5rem 1.5rem;
              display: flex;
              flex-direction: column;
              gap: 2rem;
              flex-shrink: 0;
              transition: background 0.3s, border-color 0.3s;
            }

            .genesis-theme-dark .genesis-sidebar {
              background: rgba(18, 12, 38, 0.6);
              border-right: 1px solid rgba(255, 255, 255, 0.08);
            }

            .genesis-theme-light .genesis-sidebar {
              background: rgba(255, 255, 255, 0.85);
              border-right: 1px solid rgba(0, 0, 0, 0.08);
            }

            .genesis-theme-dark .genesis-companions-sidebar-box {
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .genesis-theme-light .genesis-companions-sidebar-box {
              background: rgba(0, 0, 0, 0.02);
              border: 1px solid rgba(0, 0, 0, 0.05);
            }

            .genesis-profile-card {
              border-radius: 18px;
              padding: 1.25rem;
              display: flex;
              align-items: center;
              gap: 1rem;
            }

            .genesis-theme-dark .genesis-profile-card {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.06);
            }

            .genesis-theme-light .genesis-profile-card {
              background: rgba(0, 0, 0, 0.02);
              border: 1px solid rgba(0, 0, 0, 0.06);
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
              margin: 0;
            }

            .genesis-theme-dark .genesis-profile-name {
              color: #ffffff !important;
            }

            .genesis-theme-light .genesis-profile-name {
              color: #0f172a !important;
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
              font-weight: 700;
              margin: 0 0 0.25rem 0;
            }

            .genesis-theme-dark .genesis-sidebar-title {
              color: rgba(255, 255, 255, 0.4) !important;
            }

            .genesis-theme-light .genesis-sidebar-title {
              color: #64748b !important;
            }

            .genesis-streak-card {
              border-radius: 14px;
              padding: 0.9rem 1rem;
              display: flex;
              align-items: center;
              gap: 0.75rem;
            }

            .genesis-theme-dark .genesis-streak-card {
              background: rgba(251, 146, 60, 0.08);
              border: 1.5px solid rgba(251, 146, 60, 0.25);
              color: #fdba74;
            }

            .genesis-theme-light .genesis-streak-card {
              background: rgba(249, 115, 22, 0.08);
              border: 1.5px solid rgba(249, 115, 22, 0.25);
              color: #ea580c;
            }

            .genesis-streak-number {
              font-size: 1.4rem;
              font-weight: 900;
              line-height: 1;
            }

            .genesis-quest-item {
              border-radius: 12px;
              padding: 0.75rem 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 0.85rem;
            }

            .genesis-theme-dark .genesis-quest-item {
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(255, 255, 255, 0.05);
              color: #ffffff;
            }

            .genesis-theme-light .genesis-quest-item {
              background: rgba(0, 0, 0, 0.01);
              border: 1px solid rgba(0, 0, 0, 0.05);
              color: #334155;
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
              border-radius: 10px;
              font-size: 0.85rem;
            }

            .genesis-theme-dark .genesis-leader-item {
              background: rgba(255, 255, 255, 0.02);
              color: #ffffff;
            }

            .genesis-theme-light .genesis-leader-item {
              background: rgba(0, 0, 0, 0.02);
              color: #334155;
            }

            .genesis-leader-rank {
              font-weight: 800;
              width: 20px;
            }

            .genesis-theme-dark .genesis-leader-rank {
              color: rgba(255,255,255,0.4);
            }

            .genesis-theme-light .genesis-leader-rank {
              color: #64748b;
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
              margin: 0;
              letter-spacing: -0.01em;
            }

            .genesis-theme-dark .genesis-heading-title {
              background: linear-gradient(to right, #fff, #c084fc);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .genesis-theme-light .genesis-heading-title {
              background: linear-gradient(to right, #1e1b4b, #7c3aed);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .genesis-heading-sub {
              font-size: 0.9rem;
              margin: 0.25rem 0 0 0;
            }

            .genesis-theme-dark .genesis-heading-sub {
              color: rgba(255, 255, 255, 0.5);
            }

            .genesis-theme-light .genesis-heading-sub {
              color: #475569;
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

            .genesis-theme-dark .genesis-island-card {
              background: rgba(255, 255, 255, 0.02);
              border: 1.5px solid rgba(255, 255, 255, 0.08);
            }

            .genesis-theme-light .genesis-island-card {
              background: #ffffff;
              border: 1.5px solid rgba(0, 0, 0, 0.08);
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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
            }

            .genesis-theme-dark .genesis-island-card:hover {
              background: rgba(255, 255, 255, 0.04);
              border-color: rgba(255, 255, 255, 0.15);
              box-shadow: 0 12px 30px rgba(124, 58, 237, 0.15);
            }

            .genesis-theme-light .genesis-island-card:hover {
              background: #fafafa;
              border-color: rgba(0, 0, 0, 0.15);
              box-shadow: 0 8px 24px rgba(124, 58, 237, 0.1);
            }

            .genesis-island-card.active-selected {
              border-color: #c084fc;
              box-shadow: 0 0 25px rgba(167, 139, 250, 0.25);
            }

            .genesis-theme-dark .genesis-island-card.active-selected {
              background: rgba(167, 139, 250, 0.05);
            }

            .genesis-theme-light .genesis-island-card.active-selected {
              background: rgba(167, 139, 250, 0.08);
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

            .genesis-theme-dark .genesis-island-name {
              color: #ffffff !important;
            }

            .genesis-theme-light .genesis-island-name {
              color: #0f172a !important;
            }

            .genesis-island-sub {
              font-size: 0.8rem;
              font-weight: 600;
            }

            .genesis-theme-dark .genesis-island-sub {
              color: rgba(255, 255, 255, 0.5) !important;
            }

            .genesis-theme-light .genesis-island-sub {
              color: var(--island-accent) !important;
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

            .genesis-theme-dark .genesis-island-card p {
              color: rgba(255, 255, 255, 0.7) !important;
            }

            .genesis-theme-light .genesis-island-card p {
              color: #475569 !important;
            }

            .genesis-progress-bar-bg {
              flex: 1;
              height: 8px;
              border-radius: 99px;
              overflow: hidden;
            }

            .genesis-theme-dark .genesis-progress-bar-bg {
              background: rgba(255,255,255,0.1);
            }

            .genesis-theme-light .genesis-progress-bar-bg {
              background: rgba(0,0,0,0.06);
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
              backdrop-filter: blur(12px);
              border-radius: 20px;
              padding: 1.25rem;
              font-size: 0.875rem;
              line-height: 1.5;
              position: relative;
              box-shadow: 0 8px 32px rgba(0,0,0,0.4);
              animation: floatBubble 4s ease-in-out infinite;
            }

            .genesis-theme-dark .genesis-companion-bubble {
              background: rgba(18, 12, 38, 0.9);
              border: 1.5px solid rgba(167, 139, 250, 0.3);
              color: #ffffff;
            }

            .genesis-theme-light .genesis-companion-bubble {
              background: #ffffff;
              border: 1.5px solid rgba(124, 58, 237, 0.3);
              color: #1e293b;
              box-shadow: 0 8px 32px rgba(0,0,0,0.08);
            }

            .genesis-companion-bubble::after {
              content: '';
              position: absolute;
              bottom: -10px;
              right: 36px;
              border-width: 10px 10px 0;
              border-style: solid;
              display: block;
              width: 0;
            }

            .genesis-theme-dark .genesis-companion-bubble::after {
              border-color: rgba(18, 12, 38, 0.9) transparent;
            }

            .genesis-theme-light .genesis-companion-bubble::after {
              border-color: #ffffff transparent;
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
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.75rem;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .genesis-theme-dark .genesis-char-circle {
              background: rgba(255,255,255,0.05);
              border: 2px solid rgba(255,255,255,0.1);
            }

            .genesis-theme-light .genesis-char-circle {
              background: rgba(0,0,0,0.03);
              border: 2px solid rgba(0, 0, 0, 0.1);
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
              backdrop-filter: blur(24px);
              -webkit-backdrop-filter: blur(24px);
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
              overflow-y: auto;
            }

            .genesis-theme-dark .genesis-world-detail {
              background: rgba(18, 12, 38, 0.85);
              border-left: 1px solid rgba(255, 255, 255, 0.08);
              color: #ffffff;
              box-shadow: -10px 0 40px rgba(0,0,0,0.5);
            }

            .genesis-theme-light .genesis-world-detail {
              background: rgba(255, 255, 255, 0.95);
              border-left: 1px solid rgba(0, 0, 0, 0.08);
              color: #1e293b;
              box-shadow: -10px 0 40px rgba(0,0,0,0.1);
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

            .genesis-theme-dark .genesis-detail-close {
              color: white;
            }

            .genesis-theme-light .genesis-detail-close {
              color: #1e293b;
              border-color: rgba(0,0,0,0.1);
            }

            .genesis-detail-close:hover {
              background: rgba(0,0,0,0.08);
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

            .genesis-theme-dark .genesis-detail-title {
              color: #ffffff !important;
            }

            .genesis-theme-light .genesis-detail-title {
              color: #0f172a !important;
            }

            .genesis-detail-desc {
              font-size: 0.9rem;
              line-height: 1.6;
              margin: 0;
            }

            .genesis-theme-dark .genesis-detail-desc {
              color: rgba(255, 255, 255, 0.6) !important;
            }

            .genesis-theme-light .genesis-detail-desc {
              color: #475569 !important;
            }

            .genesis-adventures-list {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .genesis-adv-card {
              border-radius: 16px;
              padding: 1.15rem;
              display: grid;
              grid-template-columns: auto 1fr auto;
              align-items: center;
              gap: 1rem;
              transition: all 0.2s;
            }

            .genesis-theme-dark .genesis-adv-card {
              background: rgba(255, 255, 255, 0.02);
              border: 1.5px solid rgba(255, 255, 255, 0.06);
            }

            .genesis-theme-light .genesis-adv-card {
              background: rgba(0, 0, 0, 0.02);
              border: 1.5px solid rgba(0, 0, 0, 0.06);
            }

            .genesis-adv-card.unlocked:hover {
              background: rgba(255, 255, 255, 0.04);
              border-color: rgba(255, 255, 255, 0.12);
            }

            .genesis-theme-light .genesis-adv-card.unlocked:hover {
              background: rgba(0, 0, 0, 0.04);
              border-color: rgba(0, 0, 0, 0.12);
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

            .genesis-theme-dark .genesis-adv-title {
              color: #ffffff !important;
            }

            .genesis-theme-light .genesis-adv-title {
              color: #1e293b !important;
            }

            .genesis-adv-concept {
              font-size: 0.78rem;
            }

            .genesis-theme-dark .genesis-adv-concept {
              color: rgba(255,255,255,0.4);
            }

            .genesis-theme-light .genesis-adv-concept {
              color: #64748b;
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

            {/* Universe Companions Explorer */}
            <div className="genesis-sidebar-section">
              <h5 className="genesis-sidebar-title">Universe Friends</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '0.75rem', borderRadius: '14px' }} className="genesis-companions-sidebar-box">
                {companions.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCompanion(c.id);
                      setExplorerCompanion(c);
                    }}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: selectedCompanion === c.id 
                        ? (theme === 'dark' ? 'rgba(167, 139, 250, 0.15)' : 'rgba(124, 58, 237, 0.12)')
                        : (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.03)'),
                      border: selectedCompanion === c.id 
                        ? '2px solid #a78bfa' 
                        : (theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0,0,0,0.08)'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      boxShadow: selectedCompanion === c.id ? '0 0 10px rgba(167, 139, 250, 0.25)' : 'none',
                    }}
                    title={`Explore ${c.name}`}
                  >
                    {c.emoji}
                  </button>
                ))}
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
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={toggleTheme}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '0.5rem 1rem', color: theme === 'dark' ? '#fff' : '#1e293b', borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
                  title="Toggle Light/Dark Theme"
                >
                  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '0.5rem 1.25rem', color: theme === 'dark' ? '#fff' : '#1e293b', borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
                >
                  🗂️ Classic List View
                </button>
              </div>
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

                    <p style={{ margin: 0, fontSize: '0.825rem', lineHeight: 1.5 }}>
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
                  Companion ({companions.find(c => c.id === selectedCompanion)?.name})
                </span>
                {companionTexts[selectedCompanion]}
              </div>

              <div className="genesis-companion-characters">
                {companions.map(c => (
                  <button
                    key={c.id}
                    className={`genesis-char-circle ${selectedCompanion === c.id ? 'active' : ''}`}
                    onClick={() => setSelectedCompanion(c.id)}
                    title={`Speak to ${c.name}`}
                  >
                    {c.emoji}
                  </button>
                ))}
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
            {/* Companion Profile Modal Overlay */}
            {explorerCompanion && (
              <div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                }}
                onClick={() => setExplorerCompanion(null)}
              >
                <div 
                  style={{
                    background: theme === 'dark' ? 'rgba(18, 12, 38, 0.95)' : '#ffffff',
                    border: theme === 'dark' ? '1.5px solid rgba(167, 139, 250, 0.3)' : '1.5px solid rgba(124, 58, 237, 0.2)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '460px',
                    padding: '2rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                    color: theme === 'dark' ? '#ffffff' : '#1e293b',
                    position: 'relative',
                    animation: 'fadeUp 0.3s ease-out',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setExplorerCompanion(null)}
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div 
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: explorerCompanion.color + '20',
                        border: `2.5px solid ${explorerCompanion.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                      }}
                    >
                      {explorerCompanion.emoji}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: theme === 'dark' ? '#fff' : '#0f172a' }}>
                        {explorerCompanion.name}
                      </h3>
                      <span style={{ color: explorerCompanion.color, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {explorerCompanion.role}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475569', marginBottom: '1.5rem' }}>
                    {explorerCompanion.description}
                  </p>

                  <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '16px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: explorerCompanion.color, marginBottom: '0.25rem' }}>
                      Core AI Specialty
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: theme === 'dark' ? '#fff' : '#1f2937' }}>
                      💡 {explorerCompanion.specialty}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
