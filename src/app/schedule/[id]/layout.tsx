import BackButton from '@/components/common/BackButton';
import { ReactNode } from 'react';

interface layoutProps {
  children: ReactNode;
}

const ScheduleLayout = ({ children }: layoutProps) => {
  return (
    <>
      <BackButton />
      <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
        {children}
      </section>
    </>
  );
};

export default ScheduleLayout;
