'use client';

// import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LinkButton, { PathType } from './LinkButton';
import FloatNewButton from './FloatNewButton';
import Alert, { AlertType } from './Alert';

//TODO: Login을 하게되면, 토큰을 session storage에 저장해서 로그인 여부 판단
const TabBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // const { data: session } = useSession();
  const [isNewOpen, setIsOpen] = useState(false);

  const handleNewClick = () => {
    // if (session) router.push('/new');
    // else setIsOpen(true);
    router.push('/new');
    // setIsOpen(true);
  };

  const handleLoginClick = () => {
    router.push('/auth/signin');
    setIsOpen(false);
  };

  if (pathname === '/auth/signin' || pathname === '/new') return null;

  return (
    <nav className="h-[68px] w-full mx-auto min-w-[280px] max-w-[500px] z-0 fixed bottom-0 bg-white shadow-tab">
      <div className="h-full w-full grid grid-cols-3 place-items-center">
        <LinkButton path={PathType.home} />
        <FloatNewButton onClick={handleNewClick} />
        <LinkButton path={PathType.list} />
        {/* {isNewOpen && (
          <>
            <Alert
              message="일정을 등록하시겠습니까?"
              type={[
                {
                  value: AlertType.confirm,
                  onClick: () => setIsOpen(false),
                },
              ]}
            />
          </>
        )} */}
      </div>
    </nav>
  );
};

export default TabBar;
