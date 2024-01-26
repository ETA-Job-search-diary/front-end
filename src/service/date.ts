export const formatDateTimeDetails = (input: string) => {
  const fullDate = input.slice(0, 10).replaceAll('-', '.');
  const date = Number(input.slice(8, 10));

  const dateObj = new Date(input);

  const longWeekDay = formatWeekday(dateObj, 'long');
  const shortWeekDay = formatWeekday(dateObj, 'short');
  const hours12 = new Intl.DateTimeFormat('ko-KR', {
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(dateObj);
  const hours24 = input.slice(11, 16);

  return {
    fullDate,
    date,
    longWeekDay,
    shortWeekDay,
    hours12,
    hours24,
  };
};

const formatWeekday = (inputDate: Date, type: 'short' | 'long') => {
  return new Intl.DateTimeFormat('ko-KR', {
    weekday: type,
    timeZone: 'UTC',
  }).format(inputDate);
};

export const formatDateForCalendar = (inputDate?: Date) => {
  const date = inputDate || new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const convertDateFormat = (
  inputDate: string,
  targetFormat: '.' | '-' = '.',
) => {
  if (
    (targetFormat === '.' && inputDate.includes('.')) ||
    (targetFormat === '-' && inputDate.includes('-'))
  )
    return inputDate;
  return inputDate.replace(/[-.]/g, (match) => (match === '-' ? '.' : '-'));
};
