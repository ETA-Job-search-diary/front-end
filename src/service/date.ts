import { format, getDate } from 'date-fns';
import { ko } from 'date-fns/locale';
//!!!!!TODO: 더 좋은 방법 없는 지 찾아보기 (컴포넌트에서 계쏙해서 각각 호출하는게 맞나..)
export const getFormattedDate = (input: string) => {
  const [inputDate, inputTime] = input.split('T');
  const fullDate = getFormatDateStringToDot(inputDate);
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

export const getFormatDateStringToDot = (inputDate: string) => {
  return inputDate.replaceAll('-', '.');
};

export const getFormatDateStringToSlash = (inputDate: string) => {
  return inputDate.replaceAll('.', '-');
};

export const getFormatDayByDateStr = (inputDate: string) => {
  const day = format(new Date(inputDate), 'EEEE', { locale: ko });
  return day;
};

export const getFormatByDate = (inputDate: Date) => {
  const fullDate = format(inputDate, 'yyyy.MM.dd');
  return fullDate;
};

export const getConvertToDate = (inputDate: Date) => {
  const convertedDate = format(inputDate, 'yyyy-MM-dd');
  return convertedDate;
};

export const getFormatEndTimeByTimeStr = (inputTime: string) => {
  const time = inputTime.slice(0, 5);
  const { meridiem, time12Hour } = getFormattedCurrentTime(time);
  const endTime = `${meridiem} ${time12Hour}`;
  return endTime;
};

export const getFormattedCurrentTime = (current: string) => {
  let [hour, minute] = current.split(':');
  const meridiem = hour >= '12' ? '오후' : '오전';
  if (Number(hour) >= 12) {
    hour = String(Number(hour) - 12).padStart(2, '0');
  } else if (Number(hour) === 0) {
    hour = '12';
  } else {
    hour = String(hour).padStart(2, '0');
  }
  const time24Hour = `${hour.padStart(2, '0')}:${minute}`;
  const time12Hour = `${hour}:${minute}`;
  return {
    meridiem,
    time24Hour,
    time12Hour,
  };
};

export const convertTimeFormat = (meridiem: string, time: string) => {
  const [hour, minute] = time.split(':');
  if (meridiem === '오후' && Number(hour) < 12) {
    return `${Number(hour) + 12}:${minute}`;
  } else if (meridiem === '오전' && Number(hour) >= 12) {
    return `${(Number(hour) - 12).toString().padStart(2, '0')}:${minute}`;
  }
  return `${hour}:${minute}`;
};

export const getConverMeridiemToTime = (meridiem: string, time: string) => {
  const convertedTime = meridiem === '오후' ? Number(time) + 12 : time;
  return convertedTime;
};

export const getFormatCurrentDateTime = (dateTime: string) => {
  const [date] = dateTime.split('T');
  const currentDate = getFormatDateStringToDot(date);
  return currentDate;
};

export const convertToDateTime = (date: string, time: string) => {
  const convertedDate = getFormatDateStringToSlash(date);
  const formattedDate = `${convertedDate}T${time}:00.000Z`;
  return formattedDate;
};
