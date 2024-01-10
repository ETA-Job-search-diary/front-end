'use client';

import Link from 'next/link';

const AccountButton = () => {
  return (
    <Link
      href={'/my'}
      className="group col-start-2 rounded-3xl border-1 border-primary-500 px-3.5 py-0.5 text-0.75 text-primary-500 hover:scale-105 web:text-0.8"
    >
      <span className="font-bold group-hover:font-bold">My</span>
    </Link>
  );
};

export default AccountButton;
