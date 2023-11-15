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
            className="z-10 w-full bg-white rounded-medium border py-3 px-4 web:py-4 web:px-6 flex justify-center items-center"
            key={name}
            onClick={() => signIn(id, { callbackUrl })}
          >
            <Icon name={iconName} className="w-4 h-4 web:w-6 web:h-6" />
            <span className="grow text-black800 text-xs web:text-md font-medium">
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
