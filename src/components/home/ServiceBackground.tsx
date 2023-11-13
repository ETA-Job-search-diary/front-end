import { ReactNode } from 'react';
import ServiceTitle from './ServiceTitle';

interface ServiceBackgroundProps {
  children: ReactNode;
}

const ServiceBackground = ({ children }: ServiceBackgroundProps) => {
  return (
    <section className="z-10 sticky top-0 bg-white pb-3 web:pb-5 bg-gradient-pattern-sm web:bg-gradient-pattern bg-top-right bg-no-repeat">
      <ServiceTitle />
      <div className="mx-[22px] web:mx-[28px]">{children}</div>
    </section>
  );
};

export default ServiceBackground;
