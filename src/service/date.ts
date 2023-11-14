import { format, getDate } from 'date-fns';
import { ko } from 'date-fns/locale';
//TODO: 더 좋은 방법 없는 지 찾아보기 (컴포넌트에서 계쏙해서 각각 호출하는게 맞나..)
export const getFormattedDate = (input: string) => {
  const [inputDate, inputTime] = input.split('T');
  const fullDate = getFormatByDateString(inputDate);
  const date = getDate(new Date(inputDate));
  const day = getFormatDayByDateStr(inputDate);
  const endTime = getFormatEndTimeByTimeStr(inputTime);

  return {
    fullDate,
    date,
    day,
    endTime,
  };
};

export const getFormatByDateString = (inputDate: string) => {
  return inputDate.replaceAll('-', '.');
};

export const getFormatDayByDateStr = (inputDate: string) => {
  const day = format(new Date(inputDate), 'EEEE', { locale: ko });
  return day;
};

export const getFormatByDate = (inputDate: Date) => {
  const fullDate = format(inputDate, 'yyyy.MM.dd');
  return fullDate;
};

export const getFormatEndTimeByTimeStr = (inputTime: string) => {
  const time = inputTime.slice(0, 5);
  const mer = time.split(':')[0] >= '12' ? '오후' : '오전';
  const endTime = `${mer} ${time}`;
  return endTime;
};

export const getFormattedCurrentTime = () => {
  const current = new Date();
  const currentTime = format(current, 'a hh:00', { locale: ko });
  const [meridiem, time] = currentTime.split(' ');
  return { meridiem, time };
};

export const convertToDateTime = (date?: Date, time?: string) => {
  if (!date || !time) return;
  const convertedDate = format(new Date(date), 'yyyy-MM-dd');
  const formattedDate = `${convertedDate}T${time}:00.000Z`;
  return formattedDate;
};
