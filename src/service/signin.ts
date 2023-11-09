const regexOfNaver = /\bnaver\b/i;
const regexOfKakao = /\bkakao\b/i;

export const getProviderByEmail = (email: string) => {
  const isNaver = regexOfNaver.test(email);
  const name: 'naver' | 'kakao' = isNaver ? 'naver' : 'kakao';
  const label = isNaver ? '네이버' : '카카오';

  return { name, label };
};
