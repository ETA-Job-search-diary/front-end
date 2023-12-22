import { ReactNode } from 'react';

interface TooltipContentProps {
  message: string;
}

interface TooltipProps extends TooltipContentProps {
  children: ReactNode;
}

const Tooltip = ({ children, message }: TooltipProps) => {
  return (
    <Tooltip.Trigger>
      {children}
      <Tooltip.Content message={message} key={'content'} />
    </Tooltip.Trigger>
  );
};

Tooltip.Trigger = ({ children }: { children: ReactNode }) => {
  return <div className="group relative h-fit w-fit">{children}</div>;
};

Tooltip.Content = ({ message }: TooltipContentProps) => {
  return (
    <div className="bg-tooltip absolute -left-1 top-1/2 z-30 hidden h-max w-max -translate-y-1/2 translate-x-10 scale-0 whitespace-pre-wrap rounded-sm p-3 text-[0.7rem] leading-4 text-black50 opacity-0 transition-all duration-1000 group-hover:block group-hover:scale-100 group-hover:opacity-100">
      <Tooltip.Arrow />
      {message}
    </div>
  );
};

Tooltip.Arrow = () => {
  return (
    <div className="border-r-tooltip absolute -left-[6px] top-1/2 -translate-x-1/2 -translate-y-1/2 border-y-8 border-r-[12px] border-y-transparent" />
  );
};

export default Tooltip;
