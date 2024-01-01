'use client';

import useSession from '@/hook/useSession';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import MyAccount from '../signin/MyAccount';

const AccountButton = () => {
  const { token, user } = useSession();
  const [isUserPageOpen, setIsUserPageOpen] = useState(false);

  const handleAccount = () => setIsUserPageOpen((prev) => !prev);

  return (
    <>
      <button
        className="group col-start-2 rounded-3xl border-1 border-primary-500 px-3.5 py-0.5 text-0.75 text-primary-500 hover:scale-105 web:text-0.8"
        onClick={token ? handleAccount : () => signIn()}
      >
        <span className="font-semibold group-hover:font-bold">My</span>
      </button>
      {isUserPageOpen && <MyAccount session={user} onClose={handleAccount} />}
    </>
  );
};

export default AccountButton;
