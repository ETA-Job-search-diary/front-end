'use client';

import Icon from '@/assets/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LinkButton from './LinkButton';

const TabBar = () => {
  const pathname = usePathname();

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
        <div className="absolute bottom-3.5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-tab">
          <Link
            role="tab"
            aria-controls={`new-tab`}
            href="/new"
            className="group z-20 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 hover:drop-shadow-md"
          >
            <Icon
              aria-label="new-button"
              name="edit"
              className="h-8 w-8 fill-none stroke-white transition-all group-hover:scale-105"
            />
          </Link>
        </div>
        <LinkButton path="list" />
      </div>
      <div className="absolute bottom-0 grid h-full w-full place-items-center">
        <div className="h-20 w-40 bg-white" />
      </div>
    </nav>
  );
};

export default TabBar;
