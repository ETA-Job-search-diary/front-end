'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import MyAccount from '../signin/MyAccount';
import useSession from '@/hook/useSession';

const UserProfileWidget = () => {
  const { token, user } = useSession();
  const [isUserPageOpen, setIsUserPageOpen] = useState(false);

  const handleAccount = () => setIsUserPageOpen((prev) => !prev);

  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center">
      <div className="text-1.2 text-black xs:text-1.1">
        <span>{'안녕하세요 :) '}</span>
      </div>

      <button
        className="border-primary-500 text-primary-500 group col-start-2 rounded-3xl border-1 px-3.5 py-0.5 text-0.75 hover:scale-105 web:text-0.8"
        onClick={token ? handleAccount : () => signIn()}
      >
        <span className="font-semibold group-hover:font-bold">My</span>
      </button>

      {isUserPageOpen && <MyAccount session={user} onClose={handleAccount} />}
    </div>
  );
};

export default UserProfileWidget;
