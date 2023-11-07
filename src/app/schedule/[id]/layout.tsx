import BackButton from '@/components/common/BackButton';
import { ReactNode } from 'react';

interface layoutProps {
  children: ReactNode;
}

const ScheduleLayout = ({ children }: layoutProps) => {
  return (
    <section className="min-h-screen web:min-h-full w-full px-[22px] web:px-[28px]">
      <BackButton />
      {children}
    </section>
  );
};

export default ScheduleLayout;
