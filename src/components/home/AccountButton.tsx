'use client';

import Icon from '@/assets/Icon';
import Link from 'next/link';

const AccountButton = () => {
  return (
    <Link
      id={`my_button`}
      href={'/my'}
      className="group col-start-2 flex gap-1 rounded-md bg-primary-600 px-2.5 py-1 text-0.75 hover:scale-105 xs:px-1.5 xs:py-0.5 web:text-0.8"
    >
      <span className="whitespace-nowrap text-primary-50">My Page</span>
      <Icon name="my" className="h-4 w-4" />
    </Link>
  );
};

export default AccountButton;
