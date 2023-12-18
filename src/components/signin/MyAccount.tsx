import { createPortal } from 'react-dom';
import NavBar from '../common/NavBar';
import BackButton from '../navbar/BackButton';
import { User } from 'next-auth';
import Icon from '@/assets/Icon';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';
import { SERVICE_DESCRIPTION, SUPPORT_FORM } from '@/constants/service';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Alert from '../common/Alert';
import { signOut } from 'next-auth/react';
import ServiceLink from './ServiceLink';
import UserInfo from './UserInfo';
import useShowToast from '@/hook/useShowToast';
import ServiceButton from './SignOutButton';

interface MyAccountProps {
  session?: User;
  onClose: () => void;
}

const serviceTypes = {
  LOGOUT: '로그아웃 하시겠습니까?',
  WITHDRAW: '서비스를 탈퇴 하시겠습니까?',
};

const MyAccount = ({ session, onClose }: MyAccountProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { showWithdrawalToast } = useShowToast();

  if (!session) redirect('/auth/signin');
  const { name, email } = session;

  const handleAlert = (value: string) => {
    setMessage(value);
    setIsOpen(true);
  };

  const onSignOut = () => signOut({ callbackUrl: '/' });

  const onWithdraw = () => {
    setIsOpen(false);
    showWithdrawalToast();
  };

  useDisableBodyScroll();

  return createPortal(
    <section className="fixed top-0 z-30 mx-auto min-h-screen w-full min-w-[280px] max-w-[500px] bg-white pt-[calc(env(safe-area-inset-top))]">
      <NavBar
        label="마이페이지"
        leftSection={<BackButton onClose={onClose} />}
      />
      <div className="px-page web:px-[28px]">
        <UserInfo name={name} email={email} />
        <div className="flex flex-col items-center px-1 pt-3 web:px-3">
          <ServiceLink href={SERVICE_DESCRIPTION} label="서비스 소개" />
          <ServiceLink href={SUPPORT_FORM} label="문의하기" />
          <ServiceButton
            lebel="logout"
            onClick={() => handleAlert(serviceTypes.LOGOUT)}
          />
          <ServiceButton
            lebel="withdraw"
            onClick={() => handleAlert(serviceTypes.WITHDRAW)}
          />
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
                value: 'CANCEL',
                onClick: () => setIsOpen(false),
              },
              {
                value: 'CONFIRM',
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
