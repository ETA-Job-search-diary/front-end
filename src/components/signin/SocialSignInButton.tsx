'use client';

import SocialIcon from '@/assets/SocialIcon';
import { getProviderByEmail } from '@/service/signin';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

export type ProviderType = Record<string, ClientSafeProvider>;

interface SocialSignInButtonProps {
  providers: ProviderType;
  callbackUrl: string;
}
const SocialSignInButton = ({
  providers,
  callbackUrl,
}: SocialSignInButtonProps) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        const { name: iconName, label } = getProviderByEmail(name);

        return (
          <button
            id={`${iconName}_button`}
            key={name}
            className="z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center justify-center rounded-medium border-[0.7px] border-black-100 bg-white px-4 py-3 web:px-6 web:py-4"
            onClick={() => signIn(id, { callbackUrl })}
          >
            <SocialIcon name={iconName} />
            <span className="grow pl-4 text-1 font-medium text-black-800 xs:text-0.85">
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

export default SocialSignInButton;
