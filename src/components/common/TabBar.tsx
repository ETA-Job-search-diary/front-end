'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LinkButton, { PathType } from './LinkButton';
import FloatNewButton from './FloatNewButton';
import Alert, { AlertType } from './Alert';

const TabBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isNewOpen, setIsOpen] = useState(false);

  const handleNewClick = () => {
    if (session) router.push('/new');
    else setIsOpen(true);
  };

  const handleLoginClick = () => {
    router.push('/auth/signin'); // TODO:로그인 성공하면 new로 이동
    setIsOpen(false);
  };

  if (pathname === '/auth/signin' || pathname === '/new') return null;

  return (
    <nav className="h-[68px] w-full mx-auto min-w-[280px] max-w-[500px] z-0 fixed bottom-0 bg-white shadow-tab">
      <div className="relative h-full w-full grid grid-cols-3 place-items-center">
        <LinkButton path={PathType.home} />
        <FloatNewButton onClick={handleNewClick} />
        <LinkButton path={PathType.list} />
        {isNewOpen && (
          <Alert
            message="일정을 등록하시겠습니까?"
            type={[
              {
                value: AlertType.cancel,
                onClick: () => setIsOpen(false),
              },
              {
                value: AlertType.login,
                onClick: handleLoginClick,
              },
            ]}
          />
        )}
      </div>
    </nav>
  );
};

export default TabBar;
