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
    <div className="grid w-full grid-cols-[1fr_auto] items-center">
      <div className="text-md text-black xs:text-sm">
        <span>{'안녕하세요 :) '}</span>
      </div>
      <div className="col-start-2">
        <button
          onClick={session?.user.accessToken ? handleAccount : () => signIn()}
        >
          <Icon
            aria-label="=user"
            name="user"
            className="h-5 w-5 fill-black900 transition-all hover:scale-110 web:h-6 web:w-6"
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
