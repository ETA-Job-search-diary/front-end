'use client';

import Icon from '@/assets/Icon';
import { getProviderByEmail } from '@/service/signin';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

export type ProviderType = Record<string, ClientSafeProvider>;

interface SocialSiginButtonProps {
  providers: ProviderType;
  callbackUrl: string;
}
const SocialSiginButton = ({
  providers,
  callbackUrl,
}: SocialSiginButtonProps) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        const { name: iconName, label } = getProviderByEmail(name);

        return (
          <button
            className="z-10 w-full bg-white rounded-medium border-[0.7px] border-black100 py-3 px-4 web:py-4 web:px-6 grid grid-cols-[1fr_auto_1fr] items-center justify-center"
            key={name}
            onClick={() => signIn(id, { callbackUrl })}
          >
            <Icon name={iconName} className="w-7 h-7 xs:w-5 xs:h-5" />
            <span className="grow text-black800 text-xs xs:text-xxs font-medium pl-4">
              {label} 계정으로 로그인
            </span>
          </button>
        );
      })}
    </>
  );
};

export async function getServersideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SocialSiginButton;
