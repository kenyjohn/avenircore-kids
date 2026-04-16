import curiousRobot from './curious-robot.json';
import smartAssistant from './smart-assistant.json';
import dataDetective from './data-detective.json';
import kindAi from './kind-ai.json';
import aiMistake from './ai-mistake.json';
import theRobotThatCouldntSeeAmara from './the-robot-that-couldnt-see-amara.json';
import miaAndTheWeatherMachine from './mia-and-the-weather-machine.json';
import theNewsBotThatLied from './the-news-bot-that-lied.json';
import zaraBuildsADoctor from './zara-builds-a-doctor.json';
import thePrivacyJar from './the-privacy-jar.json';

export const stories = [
  curiousRobot,
  smartAssistant,
  dataDetective,
  kindAi,
  aiMistake,
  theRobotThatCouldntSeeAmara,
  miaAndTheWeatherMachine,
  theNewsBotThatLied,
  zaraBuildsADoctor,
  thePrivacyJar,
];

export const getStoryById = (id) => stories.find(s => s.id === id);
