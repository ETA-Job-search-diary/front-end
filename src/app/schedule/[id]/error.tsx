'use client';

import useShowToast from '@/hook/useShowToast';
import Error from 'next/error';
import { useEffect } from 'react';

interface errorProps {
  error: Error;
}

const error = ({ error }: errorProps) => {
  const { showErrorHomeToast } = useShowToast();

  useEffect(() => {
    showErrorHomeToast();
    console.log(error);
  }, [error, showErrorHomeToast]);

  return (
    <section className="flex h-screen w-full items-center justify-center" />
  );
};

export default error;
