import { format, getDate } from 'date-fns';
import { ko } from 'date-fns/locale';

export const getFormattedDate = ({
  start: startDate,
  end: endDate,
}: {
  start: string;
  end?: string;
}) => {
  const start = new Date(startDate);
  const end = endDate && new Date(endDate);

  const date = getDate(start);
  const day = format(start, 'EEEE', { locale: ko });
  const time = format(start, 'ppp');
  const endTime = end ? format(end, 'a hh:mm', { locale: ko }) : '';

  return {
    date,
    day,
    time,
    endTime,
  };
};
