import { getProviderInfo } from '@/service/signin';

describe('getProviderInfo', () => {
  it('이메일을 입력받으면 Provider의 정보를 반환한다', () => {
    expect(getProviderInfo('newjoblog@naver.com')).toStrictEqual({
      name: 'naver',
      label: '네이버',
    });
  });

  it('Provider를 입력받으면 Provider의 정보를 반환한다', () => {
    expect(getProviderInfo('kakao')).toStrictEqual({
      name: 'kakao',
      label: '카카오',
    });
  });

  it('잘못된 문자열을 입력받으면 null을 반환한다', () => {
    expect(getProviderInfo('')).toStrictEqual(null);
  });
});
