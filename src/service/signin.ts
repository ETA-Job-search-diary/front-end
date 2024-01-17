import { ProviderTypes } from '@/assets/SocialIcon';
import { REGEX } from '@/constants/regex';

export const getProviderByEmail = (
  email: string,
): { name: ProviderTypes; label: string } => {
  const isNaver = REGEX.NAVER.test(email);

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

  const { name, label } = isNaver ? providerMap.naver : providerMap.kakao;
  return { name, label };
};
