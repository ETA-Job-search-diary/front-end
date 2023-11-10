import { createPortal } from 'react-dom';
import NavBar from '../common/NavBar';
import BackButton from '../navbar/BackButton';
import SignOutButton from './SignOutButton';
import { Session } from 'next-auth';
import Icon from '@/assets/Icon';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { getProviderByEmail } from '@/service/signin';
import Link from 'next/link';
import { SUPPORT_FORM } from '@/constants/service';
import { redirect } from 'next/navigation';

interface MyAccountProps {
  session: Session | null;
  onClose: () => void;
}

const MyAccount = ({ session, onClose }: MyAccountProps) => {
  if (!session) {
    redirect('/auth/signin');
  }

  const {
    user: { name, email },
  } = session;

  useDisableBodyScroll();

  return createPortal(
    <section className="fixed z-30 top-0 min-h-screen mx-auto min-w-[280px] w-full max-w-[500px] bg-white">
      <NavBar
        label="마이페이지"
        leftSection={<BackButton onClose={onClose} />}
      />
      <div className="px-[22px] web:px-[28px]">
        <div className="bg-ligtht-gray rounded-large flex flex-col justify-center gap-2 h-20 web:h-[115px] px-4 web:px-6">
          <h1 className="text-black900 font-bold text-md web:text-lg">
            {name}
          </h1>
          <div className="flex items-start gap-2">
            <span>
              <Icon
                name={`${getProviderByEmail(email).name}`}
                className="w-3 h-3 web:w-4 web:h-4"
              />
            </span>
            <span className="text-black600 text-xss web:text-sm leading-3">
              {email}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center px-1 py-3 web:px-3 web:py-5">
          <Link
            href={'https://www.naver.com'} ////TODO: 서비스 소개 나오면 수정 하기 */
            rel="noopener noreferrer"
            target="_blank"
            className="w-full flex items-center gap-3 p-3 border-b border-black100"
          >
            <Icon
              name="message"
              className="w-3.5 h-3 web:w-5 web:h-4 stroke-black300"
            />
            <span className="text-xs web:text-md text-black900">
              서비스소개
            </span>
          </Link>
          <Link
            href={SUPPORT_FORM}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full flex items-center gap-3 p-3 border-b border-black100"
          >
            <Icon
              name="request"
              className="w-3.5 h-3 web:w-5 web:h-4 stroke-black300"
            />
            <span className="text-xs web:text-md text-black900">문의하기</span>
          </Link>
          <SignOutButton />
          <button type="button" className="w-full flex items-center gap-3 p-3">
            <Icon
              name="withdraw"
              className="w-3.5 h-3 web:w-5 web:h-4 stroke-black300"
            />
            <span className="text-xs web:text-md text-black900">탈퇴하기</span>
          </button>
        </div>
      </div>
    </section>,
    document.body.querySelector('main') || document.body,
  );
};

export default MyAccount;
