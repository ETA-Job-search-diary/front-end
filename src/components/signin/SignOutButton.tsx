import Icon, { IconTypes } from '@/assets/Icon';

type ServiceTypes = Extract<IconTypes, 'logout' | 'withdraw'>;

const ServiceLabel: Record<ServiceTypes, string> = {
  logout: '로그아웃',
  withdraw: '회원탈퇴',
};

interface ServiceButtonProps {
  lebel: ServiceTypes;
  onClick: () => void;
}

const ServiceButton = ({ lebel, onClick }: ServiceButtonProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 px-3 py-5"
      onClick={onClick}
    >
      <Icon name={lebel} className="stroke-black-300 h-4 w-5" />
      <span className="text-black-900 text-1">{ServiceLabel[lebel]}</span>
    </button>
  );
};

export default ServiceButton;
