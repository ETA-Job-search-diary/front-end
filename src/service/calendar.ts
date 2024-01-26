import supabase from '@/lib/supabase';
import axios from 'axios';
import { api } from './api';

type KakaoHoliday = {
  data: {
    events: KakaoHolidayData[];
  };
};

type KakaoHolidayData = {
  id: string;
  title: string;
  time: {
    start_at: string;
    end_at: string;
    all_day: boolean;
  };
  holiday: boolean;
};

export const getHolidays = async (date: string) => {
  const [year, month] = date.split('-');
  const holidays = await getHolidaysFromDB(year, month);
  if (!holidays.length) {
    const holidays = await getHolidaysFromKakao(year, month);
    return holidays;
  }
  return holidays;
};

const getHolidaysFromDB = async (
  year: string,
  month: string,
): Promise<string[]> => {
  const { data } = await supabase
    .from('holiday')
    .select('date, name')
    .like('date', `%${year}-${month}%`);

  if (!data) return [];
  return data.map((event) => event.date);
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
    const holiday = data.events.filter((event) => event.holiday);
    const holidaysForDB = holiday.map((event) => ({
      date: event.time.start_at.split('T')[0],
      name: event.title,
    }));
    await supabase.from('holiday').insert(holidaysForDB);

    return holidaysForDB.map((event) => event.date);
  } catch (e) {
    console.error(e);
  }
};

export const getUserEvents = async (currentMonth: string, token: string) => {
  return api(`/schedules/calendar/detail?date=s${currentMonth}`, 'get', token);
};
