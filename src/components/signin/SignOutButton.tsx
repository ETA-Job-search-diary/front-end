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
      className="flex w-full items-center gap-3 border-b border-black100 p-5"
      onClick={onClick}
    >
      <Icon name={lebel} className="h-4 w-5 stroke-black300" />
      <span className="text-xs text-black900">{ServiceLabel[lebel]}</span>
    </button>
  );
};

export default ServiceButton;
