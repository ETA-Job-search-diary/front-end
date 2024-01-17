import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import Icon from './Icon';

export type ProviderTypes = 'naver' | 'kakao';

interface SocialIconProps extends VariantProps<typeof socialIconVariants> {
  name?: ProviderTypes;
}

const SocialIcon = ({ name, size }: SocialIconProps) => {
  return (
    <div className={cn(socialIconVariants({ name, size }))}>
      {name && <Icon name={name} className={cn(iconVariants({ name }))} />}
    </div>
  );
};

const socialIconVariants = cva('rounded-full', {
  variants: {
    size: {
      sm: 'w-4',
      md: 'w-7 xs:w-5',
    },
    name: {
      naver: 'bg-naver',
      kakao: 'bg-kakao-yellow',
    },
  },
  compoundVariants: [
    {
      name: 'kakao',
      size: 'sm',
      class: 'p-0.5',
    },
    {
      name: 'kakao',
      size: 'md',
      class: 'p-1',
    },
    { name: 'naver', size: 'sm', class: 'p-1' },
    { name: 'naver', size: 'md', class: 'p-2' },
  ],
  defaultVariants: {
    size: 'md',
  },
});

const iconVariants = cva('w-full h-full', {
  variants: {
    name: {
      naver: 'fill-white',
      kakao: 'fill-kakao-brown',
    },
  },
});

export default SocialIcon;
