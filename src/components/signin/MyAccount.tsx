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
import StatisticsSection from './StatisticsSection';
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
      <div className="sticky top-0 z-20 h-max w-full bg-gray-100 pt-safe-top web:fixed web:min-w-280 web:max-w-500">
        <NavBar
          label="마이페이지"
          leftSection={<BackButton onClose={() => replace('/')} />}
        />
      </div>
      <div className="mb-16 flex h-max min-h-full flex-col gap-8 px-page py-2 pb-safe-bottom web:pt-20">
        <UserInfo user={user} />
        <StatisticsSection label="etc">
          <div className="divide-black100 grid grid-rows-4 divide-y-[0.5px] rounded-xl border border-black-100 bg-white px-4 xs:px-2">
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
        </StatisticsSection>
        <Icon
          name="teamETA"
          className="mt-16 h-[119px] w-40 place-self-end web:h-[155px] web:w-[212px]"
        />
      </div>
      {isOpen && (
        <Alert
          id={`${message === serviceTypes.LOGOUT ? 'logout' : 'withdraw'}_alert`}
          message={message}
          type={[
            {
              value: 'CANCEL',
              onClick: () => setIsOpen(false),
            },
            {
              value: 'CONFIRM',
              onClick: message === serviceTypes.LOGOUT ? onSignOut : onWithdraw,
            },
          ]}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default MyAccount;
