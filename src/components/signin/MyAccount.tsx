import { createPortal } from 'react-dom';
import NavBar from '../common/NavBar';
import BackButton from '../navbar/BackButton';
import SignOutButton from './SignOutButton';
import { Session } from 'next-auth';
import Icon from '@/assets/Icon';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { SERVICE_DESCRIPTION, SUPPORT_FORM } from '@/constants/service';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Alert, { alertTypes } from '../common/Alert';
import { signOut } from 'next-auth/react';
import { useToast } from '../ui/use-toast';
import ServiceLink from './ServiceLink';
import UserInfo from './UserInfo';
import { TOAST_MESSAGE } from '@/constants/toast';

interface MyAccountProps {
  session: Session | null;
  onClose: () => void;
}

const serviceTypes = {
  LOGOUT: '로그아웃 하시겠습니까?',
  WITHDRAW: '서비스를 탈퇴 하시겠습니까?',
};

const MyAccount = ({ session, onClose }: MyAccountProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  if (!session) redirect('/auth/signin');

  const {
    user: { name, email },
  } = session;

  const handleAlert = (value: string) => {
    setMessage(value);
    setIsOpen(true);
  };

  const onSignOut = () => signOut({ callbackUrl: '/' });

  const onWithdraw = () => {
    setIsOpen(false);
    handleWithdrawToast();
  };

  const handleWithdrawToast = () => {
    toast({
      title: TOAST_MESSAGE.WITHDRAW.title,
      description: TOAST_MESSAGE.WITHDRAW.description,
    });
  };

  useDisableBodyScroll();

  return createPortal(
    <section className="fixed top-0 z-30 mx-auto min-h-screen w-full min-w-[280px] max-w-[500px] bg-white pt-[calc(env(safe-area-inset-top))]">
      <NavBar
        label="마이페이지"
        leftSection={<BackButton onClose={onClose} />}
      />
      <div className="px-[22px] web:px-[28px]">
        <UserInfo name={name} email={email} />
        <div className="flex flex-col items-center px-1 pt-3 web:px-3">
          <ServiceLink href={SERVICE_DESCRIPTION} label="서비스 소개" />
          <ServiceLink href={SUPPORT_FORM} label="문의하기" />
          <SignOutButton onClick={() => handleAlert(serviceTypes.LOGOUT)} />
          <button
            type="button"
            className="flex w-full items-center gap-3 p-5"
            onClick={() => handleAlert(serviceTypes.WITHDRAW)}
          >
            <Icon
              name="withdraw"
              className="h-4 w-5 stroke-black300 web:h-4 web:w-5"
            />
            <span className="text-xs text-black900">탈퇴하기</span>
          </button>
        </div>
        <Icon
          name="teamETA"
          className="absolute bottom-20 right-7 h-[119px] w-40 web:right-10 web:h-[155px] web:w-[212px]"
        />
        {isOpen && (
          <Alert
            message={message}
            type={[
              {
                value: alertTypes.CANCEL,
                onClick: () => setIsOpen(false),
              },
              {
                value: alertTypes.CONFIRM,
                onClick:
                  message === serviceTypes.LOGOUT ? onSignOut : onWithdraw,
              },
            ]}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </section>,
    document.body.querySelector('main') || document.body,
  );
};

export default MyAccount;
