import {
  convertDateFormat,
  formatDateForCalendar,
  formatDateTimeDetails,
} from '@/service/date';

const convertISOToDateTime = (dateTimeString: string) => {
  const [dateString, timeString] = dateTimeString.split('T');
  const [year, month, day, hour, minute] = [
    ...dateString.split('-'),
    ...timeString.slice(0, -5).split(':'),
  ].map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

describe('formatDateTimeDetails', () => {
  it('ISO 날짜-시간 문자열을 입력받아 정확한 날짜(yyyy.mm.dd), dd, 요일 (long, short), XM HH:MM 객체 반환', () => {
    expect(formatDateTimeDetails('2024-01-31T23:59:59.000Z')).toEqual({
      fullDate: '2024.01.31',
      date: 31,
      longWeekDay: '수요일',
      shortWeekDay: '수',
      hours12: '오후 11:59',
      hours24: '23:59',
    });
  });
});

describe('formatDateForCalendar', () => {
  it('사용자가 캘린더에서 선택한 Date 객체를 ISO날짜-시간 형식에 저장하기 위한 yyyy-mm-dd', () => {
    expect(
      formatDateForCalendar(convertISOToDateTime('2024-01-31T23:59:59.000Z')),
    ).toEqual('2024-01-31');
  });
});

describe('convertDateFormat', () => {
  it('날짜 문자열을 기본 점 형식 (yyyy.mm.dd) 으로 변환', () => {
    expect(convertDateFormat('2024-01-31')).toEqual('2024.01.31');
  });

  it('날짜 문자열을 매개변수 "-" 를 전달하여 대시 형식 (yyyy-mm-dd) 으로 변환', () => {
    expect(convertDateFormat('2024.01.31', '-')).toEqual('2024-01-31');
  });
});
