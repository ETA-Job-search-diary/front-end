'use client';

import Icon from '@/assets/Icon';
import { SERVICE_DESCRIPTION, SUPPORT_FORM } from '@/constants/service';
import useSession from '@/hook/useSession';
import useShowToast from '@/hook/useShowToast';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Alert from '../common/Alert';
import NavBar from '../common/NavBar';
import BackButton from '../navbar/BackButton';
import ServiceButton from './ServiceButton';
import UserInfo from './UserInfo';

const serviceTypes = {
  LOGOUT: '로그아웃 하시겠습니까?',
  WITHDRAW: '서비스를 탈퇴 하시겠습니까?',
};

const MyAccount = () => {
  const { user } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { showWithdrawalToast } = useShowToast();
  const { replace } = useRouter();

  const handleAlert = (value: string) => {
    setMessage(value);
    setIsOpen(true);
  };

  const onSignOut = () => signOut({ callbackUrl: '/' });

  const onWithdraw = () => {
    setIsOpen(false);
    showWithdrawalToast();
  };

  return (
    <>
      <div className="sticky top-0 z-20 h-full w-full bg-gray-100 pt-[calc(env(safe-area-inset-top))]">
        <NavBar
          label="마이페이지"
          leftSection={<BackButton onClose={() => replace('/')} />}
        />
      </div>
      <div className="flex flex-col gap-8 px-page">
        <UserInfo user={user} />
        <div className="divide-black100 grid grid-rows-4 divide-y-[0.5px] rounded-xl border border-black-100 bg-white px-4">
          <ServiceButton.Link href={SERVICE_DESCRIPTION} label="message" />
          <ServiceButton.Link href={SUPPORT_FORM} label="helpcircle" />
          <ServiceButton
            label="logout"
            onClick={() => handleAlert(serviceTypes.LOGOUT)}
          />
          <ServiceButton
            label="withdraw"
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
    </>
  );
};

export default MyAccount;
