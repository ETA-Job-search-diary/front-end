'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import LinkButton from './LinkButton';
import FloatNewButton from '../new/FloatNewButton';
import { useCallback } from 'react';

const TabBar = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const handleLoginClick = useCallback(() => {
    if (token) push('/new');
    else push('/auth/signin');
  }, []);

  if (
    pathname === '/auth/signin' ||
    pathname === '/new' ||
    pathname.startsWith('/edit')
  )
    return null;

  return (
    <nav className="h-20 w-full mx-auto min-w-[280px] max-w-[500px] z-0 fixed bottom-0 bg-white shadow-tab">
      <div className="relative h-full w-full pb-6 web:pb-4 grid grid-cols-3 place-items-center">
        <LinkButton path="home" />
        <FloatNewButton onClick={handleLoginClick} />
        <LinkButton path="list" />
      </div>
      <div className="w-full h-full absolute bottom-0 grid place-items-center">
        <div className="bg-white w-40 h-20" />
      </div>
    </nav>
  );
};

export default TabBar;
