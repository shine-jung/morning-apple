import { updateTime } from './commons';

export const imagePreload = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const giveZeroPadding = (num: number) => {
  return num < 10 && num >= 0 ? '0' + num : num;
};

export const displayTimeKo = (date: Date) =>
  `${date.getFullYear()}년 ${giveZeroPadding(date.getMonth() + 1)}월 ${giveZeroPadding(
    date.getDate(),
  )}일 ${giveZeroPadding(date.getHours())}시 ${giveZeroPadding(
    date.getMinutes(),
  )}분 ${giveZeroPadding(date.getSeconds())}초`;

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
