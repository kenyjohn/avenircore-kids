import lunaLearnsToLearn from './luna-learns-to-learn.json';
import theRobotWhoCountedFeelings from './the-robot-who-counted-feelings.json';
import theBoyWhoTrainedAChampion from './the-boy-who-trained-a-champion.json';
import theFaceThatWasntReal from './the-face-that-wasnt-real.json';
import theFeedThatForgotTheWorld from './the-feed-that-forgot-the-world.json';
import theJobThatDisappeared from './the-job-that-disappeared.json';

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
import theDayLeoStoppedThinking from './the-day-leo-stopped-thinking.json';
import theMemoryBot from './the-memory-bot.json';

export const stories = [
  lunaLearnsToLearn,
  theRobotWhoCountedFeelings,
  theBoyWhoTrainedAChampion,
  theFaceThatWasntReal,
  theFeedThatForgotTheWorld,
  theJobThatDisappeared,
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
  theDayLeoStoppedThinking,
  theMemoryBot,
];

export const getStoryById = (id) => stories.find(s => s.id === id);
