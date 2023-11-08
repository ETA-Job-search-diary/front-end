'use client';

import { useSession } from 'next-auth/react';
import SignInOutButton from './signin/SignInOutButton';

const LoginUser = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full grid grid-cols-[1fr_auto] items-center">
      <span className="text-black text-md web:text-2xl">
        <span>안녕하세요:) </span>
        {session && <span>{session?.user.name}님</span>}
      </span>
      <div className="col-start-2">
        <SignInOutButton session={session} />
      </div>
    </div>
  );
};

export default LoginUser;
