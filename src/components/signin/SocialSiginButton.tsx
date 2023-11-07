'use client';

import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

export type ProviderType = Record<string, ClientSafeProvider>;

interface SocialSiginButtonProps {
  providers: ProviderType;
  callbackUrl: string;
}
//TODO: 디자인 - 수정
const SocialSiginButton = ({
  providers,
  callbackUrl,
}: SocialSiginButtonProps) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        return (
          <button
            className="rounded-small border py-3 px-3"
            key={name}
            onClick={() => signIn(id, { callbackUrl })}
          >
            {name} 계정으로 로그인
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
