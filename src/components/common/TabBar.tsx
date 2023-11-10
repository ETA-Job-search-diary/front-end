'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LinkButton, { PathType } from './LinkButton';
import FloatNewButton from '../new/FloatNewButton';
import Alert, { AlertType } from './Alert';

const TabBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isNewOpen, setIsOpen] = useState(false);
  //TODO: 개발중에는 로그인 잠시 보류
  const handleNewClick = () => {
    // if (session) router.push('/new');
    // else setIsOpen(true);
    router.push('/new');
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
            message="일정을 등록할까요?"
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
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default TabBar;
