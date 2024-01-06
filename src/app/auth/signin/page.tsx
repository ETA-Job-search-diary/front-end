import Icon from '@/assets/Icon';
import SocialSiginButton from '@/components/signin/SocialSiginButton';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import NavBar from '@/components/common/NavBar';
import BackButton from '@/components/navbar/BackButton';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '@/constants/service';
import { getToken } from '@/service/token';
import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: 'var(--app-white)',
};

interface SignInProps {
  searchParams: {
    callbackUrl: string;
  };
}

export default async function SingInPage({
  searchParams: { callbackUrl },
}: SignInProps) {
  const { token } = await getToken();
  if (token) redirect('/');

  const providers = (await getProviders()) ?? {};

  return (
    <>
      <NavBar leftSection={<BackButton />} />
      <section className="h-[calc(100vh-70px)] w-full overflow-x-hidden px-page">
        <div className="relative top-[10%]">
          <div className="flex flex-col gap-28 web:gap-32">
            <div className="flex flex-col gap-6 text-black-900">
              <p className="text-1.5 font-bold xs:text-1.1">
                <span className="text-primary-500">취준로그</span>
                는 로그인 후<br />
                이용이 가능해요
              </p>
              <p className="text-1.1 text-black-700 xs:text-0.85">
                간편한 SNS 로그인 후<br />
                취준 일정을 쉽고 편하게 관리해보세요!
              </p>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center gap-3">
              <SocialSiginButton
                providers={providers}
                callbackUrl={callbackUrl ?? '/'}
              />
              <Icon
                name="loginCharacter"
                className="absolute bottom-[75px] right-[-35px] h-[200px] w-[200px] web:right-[-50px] web:h-[320px] web:w-[320px]"
              />
            </div>
          </div>
          <p className="flex w-full items-center justify-center gap-2 py-7 text-black-400">
            <Icon name="alert" className="h-4 w-4 leading-4" />
            <span className="text-0.7 xs:text-0.6 web:text-0.8">
              로그인 시{' '}
              <Link
                href={TERMS_OF_SERVICE}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b border-black-500 font-medium text-black-500"
              >
                이용약관
              </Link>
              과{' '}
              <Link
                href={PRIVACY_POLICY}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b border-black-500 font-medium text-black-500"
              >
                개인정보 처리 방침
              </Link>
              에 동의하게 됩니다
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
