import Icon, { IconTypes } from '@/assets/Icon';
import Link from 'next/link';

type ServiceTypes = Extract<
  IconTypes,
  'logout' | 'withdraw' | 'message' | 'helpcircle'
>;

const ServiceLabel: Record<ServiceTypes, string> = {
  logout: '로그아웃',
  withdraw: '회원탈퇴',
  message: '문의하기',
  helpcircle: '서비스 소개',
};

interface ServiceButtonProps {
  label: ServiceTypes;
  onClick?: () => void;
}

interface ServiceButtonLinkProps extends ServiceButtonProps {
  href: string;
}

const ServiceButton = ({ label, onClick }: ServiceButtonProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 px-3 py-5"
      onClick={onClick}
    >
      <Icon name={label} className="h-4 w-5 stroke-black-300" />
      <span className="text-1 text-black-900">{ServiceLabel[label]}</span>
    </button>
  );
};

ServiceButton.Link = ({ href, label }: ServiceButtonLinkProps) => {
  return (
    <Link
      id={`service_${label}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="flex w-full items-center gap-3 px-3 py-5"
    >
      <Icon name={label} className="h-4 w-5 stroke-black-300 web:h-4 web:w-5" />
      <span className="text-1 text-black-900">{ServiceLabel[label]}</span>
    </Link>
  );
};

export default ServiceButton;
