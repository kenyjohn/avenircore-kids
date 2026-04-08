import curiousRobot from './curious-robot.json';
import smartAssistant from './smart-assistant.json';
import dataDetective from './data-detective.json';

export const stories = [
  curiousRobot,
  smartAssistant,
  dataDetective
];

export const getStoryById = (id) => stories.find(s => s.id === id);
