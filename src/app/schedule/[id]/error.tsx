'use client';

import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import Error from 'next/error';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface errorProps {
  error: Error;
}

const error = ({ error }: errorProps) => {
  const { push } = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirectToast = () => {
      toast({
        description: '에러가 발생했어요. 홈화면으로 돌아갈게요.',
        action: (
          <ToastAction onClick={() => push('/')} altText="홈">
            홈으로
          </ToastAction>
        ),
      });
    };
    handleRedirectToast();
    console.log(error);
  }, [error]);

  return (
    <section className="w-full h-screen flex justify-center items-center"></section>
  );
};

export default error;
