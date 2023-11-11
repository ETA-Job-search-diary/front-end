'use client';

import Button from '@/components/common/Button';
import Error from 'next/error';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface errorProps {
  error: Error;
  reset: () => void;
}

const error = ({ error, reset }: errorProps) => {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <section className="flex flex-col">
      <h1>아직 개발중이라소,,,, 죄송합니다. 에러입니다🥹</h1>
      <div className="flex gap-3">
        <Button color="gray" onClick={reset}>
          다시시도 👊🏻
        </Button>
        <Button color="gray" onClick={() => router.push('/')}>
          홈으로 👋🏻
        </Button>
      </div>
    </section>
  );
};

export default error;
