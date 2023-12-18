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
      <div className="xs:text-1.1 text-1.2 text-black">
        <span>{'안녕하세요 :) '}</span>
      </div>

      <button
        className="web:text-0.8 text-0.75 group col-start-2 rounded-3xl border-1 border-primary500 px-3.5 py-0.5 text-primary500 hover:scale-105"
        onClick={token ? handleAccount : () => signIn()}
      >
        <span className="font-semibold group-hover:font-bold">My</span>
      </button>

      {isUserPageOpen && <MyAccount session={user} onClose={handleAccount} />}
    </div>
  );
};

export default UserProfileWidget;
