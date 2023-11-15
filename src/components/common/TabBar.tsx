'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import LinkButton, { PathType } from './LinkButton';
import FloatNewButton from '../new/FloatNewButton';

const TabBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const handleLoginClick = () => {
    if (token) router.push('/new');
    else router.push('/auth/signin');
  };

  if (
    pathname === '/auth/signin' ||
    pathname === '/new' ||
    pathname.startsWith('/edit')
  )
    return null;

  return (
    <nav className="h-[68px] w-full mx-auto min-w-[280px] max-w-[500px] z-0 fixed bottom-0 bg-white shadow-tab">
      <div className="relative h-full w-full grid grid-cols-3 place-items-center">
        <LinkButton path={PathType.home} />
        <FloatNewButton onClick={handleLoginClick} />
        <LinkButton path={PathType.list} />
      </div>
      <div className="w-full h-full absolute bottom-0 grid place-items-center">
        <div className="bg-white w-40 h-[68px]" />
      </div>
    </nav>
  );
};

export default TabBar;
