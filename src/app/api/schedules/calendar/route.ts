import { getHolidays, getUserEvents } from '@/service/calendar';
import { getToken } from '@/service/token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;

  const currentMonth = searchParams.get('date');
  if (!currentMonth) {
    return new Response('Bad request. 유효하지 않은 요청입니다.', {
      status: 400,
    });
  }

  const { token } = await getToken();

  if (!token) {
    const holidays = await getHolidays(currentMonth);
    return NextResponse.json({ events: [], holidays });
  }

  try {
    const [events, holidays] = await Promise.all([
      getUserEvents(currentMonth, token),
      getHolidays(currentMonth),
    ]);
    return NextResponse.json({ events, holidays });
  } catch (e) {
    console.error(e);
    return new Response(
      'Internal server error. 서버 에러입니다. Calendar 정보를 가져올 수 없습니다.',
      {
        status: 500,
      },
    );
  }
}
