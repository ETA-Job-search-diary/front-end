import { getStepByValue, getSteps, isValidUrl } from '@/service/form';

describe('isValidUrl', () => {
  it('유효한 URL을 입력하면 true를 반환한다.', () => {
    expect(isValidUrl('https://www.rocketpunch.com')).toBe(true);
  });

  it('유효한 URL을 입력하면 true를 반환한다.', () => {
    expect(isValidUrl('https://www.jobkorea.co.kr')).toBe(true);
  });

  it('유효한 URL을 입력하면 true를 반환한다.', () => {
    expect(isValidUrl('http://wntd.co/91591bab')).toBe(true);
  });

  it('유효하지 않은 URL을 입력하면 false를 반환한다.', () => {
    expect(isValidUrl('htp://naver.com')).toBe(false);
  });

  it('유효하지 않은 URL을 입력하면 false를 반환한다.', () => {
    expect(isValidUrl('http:naver.com')).toBe(false);
  });

  it('유효하지 않은 URL을 입력하면 false를 반환한다.', () => {
    expect(isValidUrl('naver.com')).toBe(false);
  });

  it('유효하지 않은 URL을 입력하면 false를 반환한다.', () => {
    expect(isValidUrl('http://wntd')).toBe(false);
  });
});

describe('getStepByValue', () => {
  it('유효한 value를 입력하면 해당하는 step의 name을 반환한다.', () => {
    expect(getStepByValue('assignment')).toBe('사전과제');
  });

  it('유효한 value를 입력하면 해당하는 step의 name을 반환한다.', () => {
    expect(getStepByValue('first')).toBe('1차면접');
  });
});

describe('getSteps', () => {
  it('StepTypes를 입력받으면 StatisticsType 객체를 반환한다', () => {
    expect(getSteps('assignment')).toBe('documentAssignment');
  });

  it('StepTypes를 입력받으면 StatisticsType 객체를 반환한다', () => {
    expect(getSteps('personality')).toBe('personalityWritten');
  });
});
