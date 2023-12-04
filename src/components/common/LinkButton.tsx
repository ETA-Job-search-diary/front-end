'use client';

import Link from 'next/link';
import HomeIcon from '@/assets/HomeIcon';
import ListIcon from '@/assets/ListIcon';
import { usePathname } from 'next/navigation';

interface LinkButtonProps {
  path: 'home' | 'list';
}

interface PathMapItemType {
  href: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  name: string;
  position: 'left' | 'right';
}

const PathMap: Record<'home' | 'list', PathMapItemType> = {
  home: {
    href: '/',
    icon: <HomeIcon />,
    activeIcon: <HomeIcon active />,
    name: '홈',
    position: 'left',
  },
  list: {
    href: '/list',
    icon: <ListIcon />,
    activeIcon: <ListIcon active />,
    name: '취준기록',
    position: 'right',
  },
};

const LinkButton = ({ path }: LinkButtonProps) => {
  const current = usePathname();
  const { href, icon, activeIcon, name, position } = PathMap[path];
  const isCurrent = current === href;
  const isLeft = position === 'left';

  return (
    <Link
      href={href}
      className={`z-20 w-20 flex flex-col items-center justify-center web:text-xxs ${
        isLeft ? 'col-start-1' : 'col-start-3'
      }`}
    >
      {isCurrent ? activeIcon : icon}
      <span
        className={`hidden web:inline ${
          isCurrent ? 'text-black900' : 'text-black200'
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

export default LinkButton;
