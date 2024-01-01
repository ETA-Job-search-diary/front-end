import { REGEX } from '@/constants/regex';

export const getProviderByEmail = (email: string) => {
  const isNaver = REGEX.NAVER.test(email);
  const name: 'naver' | 'kakao' = isNaver ? 'naver' : 'kakao';
  const label = isNaver ? '네이버' : '카카오';

  return { name, label };
};
