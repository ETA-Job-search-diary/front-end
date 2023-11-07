import Icon from '@/assets/Icon';
import SocialSiginButton from '@/components/signin/SocialSiginButton';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Singin = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  const providers = (await getProviders()) ?? {};

  return (
    <div className="overflow-hidden min-h-screen web:min-h-full w-full px-[22px] web:px-[28px] flex flex-col gap-28 web:gap-[170px]">
      <div className="pt-40 web:pt-[293px] text-black700">
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
  );
};

export default Singin;
