import Icon from '@/assets/Icon';
import SocialSiginButton from '@/components/signin/SocialSiginButton';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NavBar from '../common/NavBar';
import BackButton from '../navbar/BackButton';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '@/constants/service';

const Singin = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  const providers = (await getProviders()) ?? {};

  return (
    <>
      <NavBar leftSection={<BackButton />} />
      <section className="overflow-x-hidden w-full h-[calc(100vh-70px)] px-[22px] web:px-[28px]">
        <div className="relative top-[15%]">
          <div className="flex flex-col gap-28 web:gap-[170px]">
            <div className="text-black700">
              <p className="font-bold text-xl web:text-3xl">
                <span className="text-primary500">취준로그</span>
                는 로그인 후<br />
                이용이 가능해요
              </p>
              <p className="text-xs web:text-lg">
                간편한 SNS 로그인 후<br />
                취준 일정을 쉽고 편하게 관리해보세요!
              </p>
            </div>
            <div className="relative w-full flex flex-col gap-3 justify-center items-center">
              <SocialSiginButton providers={providers} callbackUrl={'/'} />
              <Icon
                name="loginCharacter"
                className="absolute bottom-[75px] right-[-35px] web:right-[-50px] h-[200px] w-[200px] web:h-[320px] web:w-[320px]"
              />
            </div>
          </div>
          <p className="w-full flex justify-center items-center gap-2 py-10 text-black400">
            <Icon
              name="alert"
              className="w-3.5 h-3.5 web:w-4 web:h-4 leading-4"
            />
            <span className="text-[10px] web:text-xs">
              로그인 시{' '}
              <Link
                href={TERMS_OF_SERVICE}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b text-black400"
              >
                이용약관
              </Link>
              과{' '}
              <Link
                href={PRIVACY_POLICY}
                rel="noopener noreferrer"
                target="_blank"
                className="border-b text-black400"
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
};

export default Singin;
