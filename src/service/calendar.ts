import { StatisticsType } from '@/components/signin/StepStatistics';
import supabase from '@/lib/supabase';
import { StepTypes } from '@/model/schedule';
import axios from 'axios';
import { api } from './api';

type KakaoHoliday = {
  data: {
    events: EventData[];
  };
};

type EventData = {
  date: string;
  name: string;
  holiday?: boolean;
};

export const getHolidays = async (date: string) => {
  const [year, month] = date.split('-');
  const holidays = await getHolidaysFromDB(year, month);
  if (!holidays) {
    const holidays = await getHolidaysFromKakao(year, month);
    return holidays;
  }
  return holidays;
};

const getHolidaysFromDB = async (year: string, month: string) => {
  const { data } = await supabase
    .from('holiday')
    .select('date, name')
    .like('date', `%${year}-${month}%`);
  if (!data) return false;
  return getDateMap(data);
};

const getDateMap = (data: EventData[]) => {
  return data.reduce((map: Record<string, string>, event) => {
    map[event.date] = event.name;
    return map;
  }, {});
};

const getHolidaysFromKakao = async (year: string, month: string) => {
  try {
    const { data }: KakaoHoliday = await axios.get(
      'https://kapi.kakao.com/v2/api/calendar/holidays',
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        },
        params: {
          from: `${year}-${month}-01T00:00:00Z`,
          to: `${year}-${month}-31T00:00:00Z`,
        },
      },
    );
    const holiday = data.events.filter((event: any) => event.holiday);

    const holidaysForDB = holiday.map((event: any) => ({
      date: event.time.start_at,
      name: event.title,
    }));
    await supabase.from('holiday').insert(holidaysForDB);

    return getDateMap(holiday);
  } catch (e) {
    console.error(e);
  }
};

export const getUserEvents = async (currentMonth: string, token: string) => {
  return api(`/schedules/calendar/detail?date=s${currentMonth}`, 'get', token);
};

export const getSteps = (step: StepTypes): StatisticsType => {
  switch (step) {
    case 'document':
    case 'assignment':
      return 'documentAssignment';
    case 'personality':
    case 'written':
      return 'personalityWritten';
    case 'first':
    case 'second':
    case 'final':
      return 'interview';
    default:
      return 'etc';
  }
};
