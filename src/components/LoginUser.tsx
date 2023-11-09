'use client';

import { signIn, useSession } from 'next-auth/react';
import Icon from '@/assets/Icon';
import { useState } from 'react';
import MyAccount from './MyAccount';

//TODO: 컴포넌트명 수정 필요 (... 기획의도에 맞게 수정)
const LoginUser = () => {
  const { data: session } = useSession();
  const [isUserPageOpen, setIsUserPageOpen] = useState(false);

  const handleAccount = () => setIsUserPageOpen(!isUserPageOpen);

  return (
    <div className="w-full grid grid-cols-[1fr_auto] items-center">
      <span className="text-black text-md web:text-2xl">
        <span>{'안녕하세요:)'}</span>
        {session && <span>{session?.user.name}님</span>}
      </span>
      <div className="col-start-2">
        <button onClick={session ? handleAccount : () => signIn()}>
          <Icon
            name="person"
            className="w-4 h-4 web:w-5 web:h-5 fill-black900 hover:scale-105 transition-all"
          />
        </button>
      </div>
      {isUserPageOpen && (
        <MyAccount session={session} onClose={handleAccount} />
      )}
    </div>
  );
};

export default LoginUser;
