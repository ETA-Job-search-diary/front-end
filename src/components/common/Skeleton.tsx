import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  className?: string;
}

const Skeleton = ({ size, className }: SkeletonProps) => {
  return <div className={cn(skeletonVariants({ size }), className)}></div>;
};

const skeletonVariants = cva(
  'before:absolute before:animate-loading before:bg-gradient-to-r before:from-black50 before:via-light before:to-black50 before:h-10 before:w-3/4 relative rounded-sm bg-black50 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-2.5 web:h-3.5 w-10',
        md: 'h-2.5 web:h-3.5 w-20',
        lg: 'h-2.5 web:h-3.5 w-32',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

Skeleton.List = () => {
  return (
    <ul className="flex flex-col gap-5">
      <Skeleton.Item />
      <Skeleton.Item />
      <Skeleton.Item />
    </ul>
  );
};

Skeleton.Item = () => {
  return (
    <li
      className={`relative grid h-[88px] w-full animate-pulse grid-cols-[auto_1fr_auto] rounded-large border border-black100 bg-white py-3 web:h-[129px] web:py-6`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center border-r border-black100 px-6 text-black900 xs:px-3 web:px-[30px]">
        <Skeleton />
      </div>
      <div className="flex w-full flex-col justify-center gap-2 pl-6 xs:pl-3 web:pl-[30px]">
        <Skeleton size="sm" />
        <div>
          <Skeleton size="md" />
        </div>
        <Skeleton size="lg" />
      </div>
      <div className="w-full place-self-center pr-6 xs:pr-3 web:pr-[30px]">
        <Skeleton />
      </div>
    </li>
  );
};

export default Skeleton;
