import { updateTime } from './commons';

export const imagePreload = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const giveZeroPadding = (num: number) => {
  return num < 10 && num >= 0 ? '0' + num : num;
};

export const getNextDate = () => {
  const date = new Date();
  if (
    date.getHours() > updateTime.hour ||
    (date.getHours() >= updateTime.hour && date.getMinutes() > updateTime.minute)
  ) {
    date.setDate(date.getDate() + 1);
  }
  date.setHours(updateTime.hour);
  date.setMinutes(updateTime.minute);
  date.setSeconds(0);

  return date;
};
