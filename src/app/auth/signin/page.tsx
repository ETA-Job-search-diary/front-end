import Icon from '@/assets/Icon';
import SocialSiginButton from '@/components/signin/SocialSiginButton';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '@/constants/service';
import NavBar from '@/components/common/NavBar';
import BackButton from '@/components/navbar/BackButton';

interface SignInProps {
  searchParams: {
    callbackUrl: string;
  };
}

export default async function SingInPage({
  searchParams: { callbackUrl },
}: SignInProps) {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  const providers = (await getProviders()) ?? {};

  return (
    <>
      <NavBar leftSection={<BackButton />} />
      <section className="overflow-x-hidden w-full h-[calc(100vh-70px)] px-[22px] web:px-[28px]">
        <div className="relative top-[10%]">
          <div className="flex flex-col gap-28 web:gap-32">
            <div className="text-black900 flex flex-col gap-6">
              <p className="font-bold text-xl xs:text-sm">
                <span className="text-primary500">취준로그</span>
                는 로그인 후<br />
                이용이 가능해요
              </p>
              <p className="text-sm xs:text-xxs text-black700">
                간편한 SNS 로그인 후<br />
                취준 일정을 쉽고 편하게 관리해보세요!
              </p>
            </div>
            <div className="relative w-full flex flex-col gap-3 justify-center items-center">
              <SocialSiginButton
                providers={providers}
                callbackUrl={callbackUrl ?? '/'}
              />
              <Icon
                name="loginCharacter"
                className="absolute bottom-[75px] right-[-35px] web:right-[-50px] h-[200px] w-[200px] web:h-[320px] web:w-[320px]"
              />
            </div>
          </div>
          <p className="w-full flex justify-center items-center gap-2 py-7 text-black400">
            <Icon name="alert" className="w-4 h-4 leading-4" />
            <span className="text-[0.7rem] web:text-xxxs xs:text-[0.55rem]">
              로그인 시{' '}
              <Link
                href={TERMS_OF_SERVICE}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b text-black500 border-black500 font-medium"
              >
                이용약관
              </Link>
              과{' '}
              <Link
                href={PRIVACY_POLICY}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b text-black500 border-black500 font-medium"
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
