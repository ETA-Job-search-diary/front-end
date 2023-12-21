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
  const { name, email } = session; // TODO: session정보 말고 합격률, 지원현황 정보 받아와야됨 (UerInfo.tsx)

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
    <section className="fixed top-0 z-30 mx-auto h-full min-h-screen w-full min-w-280 max-w-500 overflow-auto bg-[#FAFAFA] pt-safe-top">
      <NavBar
        label="마이페이지"
        leftSection={<BackButton onClose={onClose} />}
      />
      <div className="flex flex-col gap-8 px-page">
        <UserInfo name={name} email={email} />
        <div className="grid grid-rows-4 divide-y-[0.5px] divide-black100 rounded-xl border border-black100 bg-white px-4">
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
          className="mb-16 mt-20 h-[119px] w-40 place-self-end web:h-[155px] web:w-[212px]"
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
    document.body.querySelector('main')!,
  );
};

export default MyAccount;
