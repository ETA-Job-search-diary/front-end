'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface SignInOutButtonProps {
  session: Session | null;
}

const SignInOutButton = ({ session }: SignInOutButtonProps) => {
  const buttonLabel = session ? '로그아웃' : '로그인';
  const handleOnClick = session
    ? () =>
        signOut({
          callbackUrl: '/',
        })
    : () => signIn();

  return (
    <button
      className="rounded-md p-1 border border-black200 text-black900 text-xs my-1 bg-background"
      onClick={handleOnClick}
    >
      {buttonLabel}
    </button>
  );
};

export default SignInOutButton;
