export const parseDateTimeString = (dateTimeString: string) => {
  const [dateString, timeString] = dateTimeString.split('T');
  const [year, month, day, hour, minute] = [
    ...dateString.split('-'),
    ...timeString.slice(0, -5).split(':'),
  ].map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

export const formatDateStringWithDot = (inputDate: Date) => {
  return inputDate
    .toLocaleDateString('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\s/g, '')
    .slice(0, -1);
};

export const formattedDayOfWeek = (inputDate: Date, type: 'short' | 'long') => {
  return new Intl.DateTimeFormat('ko-KR', { weekday: type }).format(inputDate);
};

export const formattedEndTime = (inputDate: Date) => {
  return inputDate.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const getFormattedDateTimeInfo = (input: string) => {
  const inputDate = parseDateTimeString(input);
  const fullDate = formatDateStringWithDot(inputDate);
  const date = inputDate.getDate();
  const day = formattedDayOfWeek(inputDate, 'long');
  const shortDay = formattedDayOfWeek(inputDate, 'short');
  const endTime = formattedEndTime(inputDate);
  return {
    fullDate,
    date,
    day,
    shortDay,
    endTime,
  };
};

export const formatCalendarDate = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getFormattedISODateTime = (origin?: string) => {
  const dateObj = origin ? new Date(origin) : new Date();

  const date = origin
    ? origin.slice(0, 10).replaceAll('-', '.')
    : formatDateStringWithDot(dateObj);

  const time = origin ? origin.slice(11, 16) : '00:00';

  return {
    fullDate: `${date.replaceAll('.', '-')}T${time}:00.000Z`,
    date,
    time,
  };
};

export const convertDateToAlternateFormat = (
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
