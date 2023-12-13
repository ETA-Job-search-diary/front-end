const parseDateTimeString = (dateTimeString: string) => {
  const [dateString, timeString] = dateTimeString.split('T');
  const [year, month, day, hour, minute] = [
    ...dateString.split('-'),
    ...timeString.slice(0, -5).split(':'),
  ].map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

const formatDateStringWithDot = (inputDate: Date) => {
  return inputDate
    .toLocaleDateString('ko', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\s/g, '')
    .slice(0, -1);
};

const formattedDayOfWeek = (inputDate: Date) => {
  return new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(
    inputDate,
  );
};

const formattedEndTime = (inputDate: Date) => {
  return inputDate.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const getFormattedDateTimeInfo = (input: string) => {
  const inputDate = parseDateTimeString(input);
  const fullDate = formatDateStringWithDot(inputDate);
  const date = inputDate.getDate();
  const day = formattedDayOfWeek(inputDate);
  const endTime = formattedEndTime(inputDate);
  return {
    fullDate,
    date,
    day,
    endTime,
  };
};

export const formatCalendarDate = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getFormattedCurrentTime = (current: string) => {
  const [hour, minute] = current.split(':');
  let formatedHour = hour;
  const meridiem = formatedHour >= '12' ? '오후' : '오전';
  if (Number(formatedHour) > 12) {
    formatedHour = String(Number(formatedHour) - 12).padStart(2, '0');
  } else if (Number(formatedHour) === 0) {
    formatedHour = '12';
  } else {
    formatedHour = String(Number(formatedHour)).padStart(2, '0');
  }
  const time24Hour = `${String(Number(hour)).padStart(2, '0')}:${minute}`;
  const time12Hour = `${formatedHour}:${minute}`;

  return {
    meridiem,
    time24Hour,
    time12Hour,
  };
};

export const combineTo24Hour = (meridiem: string, time: string) => {
  let [hour, minute] = time.split(':');
  if (meridiem === '오후' && Number(hour) < 12) {
    hour = String(Number(hour) + 12);
  } else if (meridiem === '오전' && Number(hour) >= 12) {
    hour = String(Number(hour) - 12);
  }
  return `${hour.padStart(2, '0')}:${minute}`;
};

export const formatToISODateTime = (inputDate: string, inputTime: string) => {
  const cleanedDateStr = inputDate.replaceAll('.', '-');
  const combinedDateTimeStr = `${cleanedDateStr}T${inputTime}:00.000Z`;
  return combinedDateTimeStr;
};

export const getFormattedISODateTime = (origin?: string) => {
  const dateObj = origin ? new Date(origin) : new Date();
  const date = origin
    ? origin.slice(0, 10).replaceAll('-', '.')
    : formatDateStringWithDot(dateObj);
  const time = origin ? origin.slice(11, 16) : '00:00';

  return {
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
