import curiousRobot from './curious-robot.json';
import smartAssistant from './smart-assistant.json';
import dataDetective from './data-detective.json';
import kindAi from './kind-ai.json';
import aiMistake from './ai-mistake.json';

export const stories = [
  curiousRobot,
  smartAssistant,
  dataDetective,
  kindAi,
  aiMistake
];

export const getStoryById = (id) => stories.find(s => s.id === id);
