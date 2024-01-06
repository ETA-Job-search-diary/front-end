'use client';

import useSession from '@/hook/useSession';
import { usePathname, useRouter } from 'next/navigation';
import FloatNewButton from '../new/FloatNewButton';
import LinkButton from './LinkButton';

const TabBar = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { token } = useSession();

  const handleLoginClick = () => {
    if (token) push('/new');
    else push('/auth/signin');
  };

  if (
    pathname === '/auth/signin' ||
    pathname === '/new' ||
    pathname === '/my' ||
    pathname.startsWith('/edit')
  )
    return null;

  return (
    <nav className="fixed bottom-0 z-40 mx-auto h-20 w-full min-w-280 max-w-500 bg-white shadow-tab">
      <div className="relative grid h-full w-full grid-cols-3 place-items-center pb-6 web:pb-4">
        <LinkButton path="home" />
        <FloatNewButton onClick={handleLoginClick} />
        <LinkButton path="list" />
      </div>
      <div className="absolute bottom-0 grid h-full w-full place-items-center">
        <div className="h-20 w-40 bg-white" />
      </div>
    </nav>
  );
};

export default TabBar;
