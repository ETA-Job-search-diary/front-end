import { ReactNode } from 'react';
import ServiceTitle from './ServiceTitle';

interface ServiceBackgroundProps {
  children: ReactNode;
}

const ServiceBackground = ({ children }: ServiceBackgroundProps) => {
  return (
    <section className="sticky top-0 z-10 bg-white bg-gradient-pattern-sm bg-top-right bg-no-repeat pb-3 web:bg-gradient-pattern web:pb-5">
      <ServiceTitle />
      <div className="mx-[22px] web:mx-[28px]">{children}</div>
    </section>
  );
};

export default ServiceBackground;
