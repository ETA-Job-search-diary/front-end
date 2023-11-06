'use client';

import Link from 'next/link';
import HomeIcon from '@/assets/HomeIcon';
import ListIcon from '@/assets/ListIcon';
import { usePathname } from 'next/navigation';

export enum PathType {
  home = 'home',
  list = 'list',
}

interface LinkButtonProps {
  path: PathType;
}

const PathMap: Record<
  PathType,
  { href: string; icon: JSX.Element; activeIcon: JSX.Element; name: string }
> = {
  home: {
    href: '/',
    icon: <HomeIcon />,
    activeIcon: <HomeIcon active />,
    name: '홈',
  },
  list: {
    href: '/list',
    icon: <ListIcon />,
    activeIcon: <ListIcon active />,
    name: '취준기록',
  },
};

const LinkButton = ({ path }: LinkButtonProps) => {
  const current = usePathname();
  const { href, icon, activeIcon, name } = PathMap[path];
  return (
    <Link
      href={href}
      className="w-20 flex flex-col items-center justify-center web:text-xxs"
    >
      {current === href ? activeIcon : icon}
      <span
        className={`hidden web:inline ${
          current === href ? 'text-black900' : 'text-black200'
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

export default LinkButton;
