import {
  convertDateToAlternateFormat,
  formatCalendarDate,
  formatDateStringWithDot,
  formattedDayOfWeek,
  formattedEndTime,
  getFormattedDateTimeInfo,
  getFormattedISODateTime,
  parseDateTimeString,
} from '@/service/date';

describe('getFormattedDateTimeInfo', () => {
  it('사용자의 Date time string으로부터 Detail, List item에 필요한 모든 날짜 포맷', () => {
    expect(getFormattedDateTimeInfo('2024-01-31T23:59:59.000Z')).toEqual({
      fullDate: '2024.01.31',
      date: 31,
      day: '수요일',
      shortDay: '수',
      endTime: '오후 11:59',
    });
  });
});

describe('parseDateTimeString', () => {
  it('사용자의 Date time string으로부터 정확한 Date Obj로 변환', () => {
    expect(parseDateTimeString('2024-01-31T15:30:00.000Z')).toEqual(
      new Date(2024, 0, 31, 15, 30),
    );
  });
});

describe('formatDateStringWithDot', () => {
  it('Date Obj에서 . 로 포맷한 년원일 추출', () => {
    expect(formatDateStringWithDot(new Date())).toEqual('2024.01.26');
  });
});

describe('formattedDayOfWeek', () => {
  it('Date Obj format 한국 요일 (길게)', () => {
    expect(
      formattedDayOfWeek(
        parseDateTimeString('2024-01-31T23:59:59.000Z'),
        'long',
      ),
    ).toEqual('수요일');
  });

  it('Date Obj format 한국 요일 (짧게)', () => {
    expect(
      formattedDayOfWeek(
        parseDateTimeString('2024-01-31T23:59:59.000Z'),
        'short',
      ),
    ).toEqual('수');
  });
});

describe('formattedEndTime', () => {
  it('Date Obj format info XM HH:MM (Korean Standard)', () => {
    expect(
      formattedEndTime(parseDateTimeString('2024-01-31T23:59:59.000Z')),
    ).toEqual('오후 11:59');
  });
});

describe('formatCalendarDate', () => {
  it('Date Obj into format for Calendar (yyyy-mm-dd)', () => {
    expect(
      formatCalendarDate(parseDateTimeString('2024-01-31T23:59:59.000Z')),
    ).toEqual('2024-01-31');
  });
});

describe('getFormattedISODateTime', () => {
  it('사용자의 Date time string 또는 현재 Date Obj로부터 fullDate, date with dots, 24hour Time format 추출 (DateTimePicker, Form, List Item)', () => {
    expect(getFormattedISODateTime('2024-01-31T23:59:59.000Z')).toEqual({
      fullDate: '2024-01-31T23:59:00.000Z',
      date: '2024.01.31',
      time: '23:59',
    });
  });
});

describe('convertDateToAlternateFormat', () => {
  it('Date string format with default dots (yyyy.mm.dd)', () => {
    expect(convertDateToAlternateFormat('2024-01-31')).toEqual('2024.01.31');
  });

  it('Date string format with slash (yyyy-mm-dd)', () => {
    expect(convertDateToAlternateFormat('2024-01-31', '-')).toEqual(
      '2024-01-31',
    );
  });
});
