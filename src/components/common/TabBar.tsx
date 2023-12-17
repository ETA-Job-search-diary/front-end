'use client';

import { usePathname, useRouter } from 'next/navigation';
import LinkButton from './LinkButton';
import FloatNewButton from '../new/FloatNewButton';
import useSession from '@/hook/useSession';

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
    pathname.startsWith('/edit')
  )
    return null;

  return (
    <nav className="fixed bottom-0 z-0 mx-auto h-20 w-full min-w-[280px] max-w-[500px] bg-white shadow-tab">
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
