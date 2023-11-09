import { format, getDate } from 'date-fns';
import { ko } from 'date-fns/locale';

export const getFormattedDate = (inputDate: string) => {
  const input = new Date(inputDate);
  const fullDate = getFormattedFullDate(inputDate);
  const date = getDate(input); // 날짜
  const day = format(input, 'EEEE', { locale: ko }); // 요일
  const time = format(input, 'ppp'); // 시간
  const endTime = format(input, 'a hh:mm', { locale: ko }); // 시간

  return {
    fullDate,
    date,
    day,
    time,
    endTime,
  };
};

export const getFormattedFullDate = (inputDate: Date | string) => {
  const input = new Date(inputDate);
  const fullDate = format(input, 'yyyy.MM.dd');
  return fullDate;
};

export const getFormattedCurrentTime = () => {
  const current = new Date();
  const currentTime = format(current, 'a hh:00', { locale: ko });
  const [meridiem, time] = currentTime.split(' ');
  return { meridiem, time };
};
