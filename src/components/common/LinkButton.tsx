'use client';

import Icon from '@/assets/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

interface LinkButtonProps {
  path: 'home' | 'list';
}

interface PathMapItemType {
  href: string;
  position: 'left' | 'right';
}

const PathMap: Record<'home' | 'list', PathMapItemType> = {
  home: {
    href: '/',
    position: 'left',
  },
  list: {
    href: '/list',
    position: 'right',
  },
};

const LinkButton = ({ path }: LinkButtonProps) => {
  const current = usePathname();
  const { href, position } = PathMap[path];
  const isCurrent = current === href;
  const isLeft = position === 'left';

  return (
    <Link
      id={`${path}_button`}
      href={href}
      aria-label={`${path} link`}
      className={`z-20 flex h-full w-full flex-col items-center justify-center web:text-0.85 ${
        isLeft ? 'col-start-1' : 'col-start-3'
      }`}
    >
      <Icon
        name={path}
        className={`fill-none transition-all hover:scale-110 ${
          isCurrent ? 'stroke-primary-500' : 'stroke-black-500'
        }`}
      />
    </Link>
  );
};

export default memo(LinkButton);
