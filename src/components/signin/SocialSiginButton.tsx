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
            className="border-black-100 z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center justify-center rounded-medium border-[0.7px] bg-white px-4 py-3 web:px-6 web:py-4"
            key={name}
            onClick={() => signIn(id, { callbackUrl })}
          >
            <Icon name={iconName} className="h-7 w-7 xs:h-5 xs:w-5" />
            <span className="text-black-800 grow pl-4 text-1 font-medium xs:text-0.85">
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
