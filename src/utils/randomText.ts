import { textList } from './commons';

export const getText = () => {
  const choice = textList[Math.floor(Math.random() * textList.length)];
  return choice;
};
