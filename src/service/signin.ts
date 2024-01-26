import { ProviderTypes } from '@/assets/SocialIcon';
import { REGEX } from '@/constants/regex';

export const getProviderInfo = (
  string: string,
): { name: ProviderTypes; label: string } | null => {
  const isNaver = REGEX.NAVER.test(string);
  const isKakao = REGEX.KAKAO.test(string);

  const providerMap: Record<
    ProviderTypes,
    { name: ProviderTypes; label: string }
  > = {
    naver: {
      name: 'naver',
      label: '네이버',
    },
    kakao: {
      name: 'kakao',
      label: '카카오',
    },
  };

  return isNaver ? providerMap.naver : isKakao ? providerMap.kakao : null;
};
