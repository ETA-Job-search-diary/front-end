import { ReactNode } from 'react';
import ServiceTitle from './ServiceTitle';
import Icon from '@/assets/Icon';

interface ServiceBackgroundProps {
  children: ReactNode;
}

const ServiceBackground = ({ children }: ServiceBackgroundProps) => {
  return (
    <div className="sticky top-0 bg-white pb-6 web:pb-9 bg-gradient-pattern-sm web:bg-gradient-pattern bg-top-right bg-no-repeat">
      <ServiceTitle />
      <div className="h-full mx-[22px] web:mx-[28px]">{children}</div>
    </div>
  );
};

export default ServiceBackground;
