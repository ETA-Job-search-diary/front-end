'use client';

import { signIn, useSession } from 'next-auth/react';
import Icon from '@/assets/Icon';
import { useState } from 'react';
import MyAccount from '../signin/MyAccount';

const UserProfileWidget = () => {
  const { data: session } = useSession();
  const [isUserPageOpen, setIsUserPageOpen] = useState(false);

  const handleAccount = () => setIsUserPageOpen((prev) => !prev);

  return (
    <div className="w-full grid grid-cols-[1fr_auto] items-center">
      <div className="text-black text-md xs:text-sm">
        <span>{'안녕하세요 :) '}</span>
      </div>
      <div className="col-start-2">
        <button onClick={session ? handleAccount : () => signIn()}>
          <Icon
            aria-label="=user"
            name="user"
            className="w-5 h-5 web:w-6 web:h-6 fill-black900 hover:scale-110 transition-all"
          />
        </button>
      </div>
      {isUserPageOpen && (
        <MyAccount session={session} onClose={handleAccount} />
      )}
    </div>
  );
};

export default UserProfileWidget;
