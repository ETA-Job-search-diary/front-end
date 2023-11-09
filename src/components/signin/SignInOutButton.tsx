'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Icon from '@/assets/Icon';

interface SignInOutButtonProps {
  session: Session | null;
}

const loginType: Record<
  string,
  {
    text: string;
    icon: 'person' | 'logout';
  }
> = {
  login: {
    text: '로그인',
    icon: 'person',
  },
  logout: {
    text: '로그아웃',
    icon: 'logout',
  },
};

const SignInOutButton = ({ session }: SignInOutButtonProps) => {
  const buttonType = session ? loginType.logout : loginType.login;
  const handleOnClick = session
    ? () =>
        signOut({
          callbackUrl: '/',
        })
    : () => signIn();

  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-3"
      onClick={handleOnClick}
    >
      <Icon
        name={buttonType.icon}
        className="w-3.5 h-3 web:w-5 web:h-4 stroke-black300"
      />
      <span className="text-xs web:text-md text-black900">
        {buttonType.text}
      </span>
    </button>
  );
};

export default SignInOutButton;
