import Icon from '@/assets/Icon';
import { SCHEDULE_MESSAGE } from '@/constants/schedule';

interface EmptyItemProps {
  messageType: keyof typeof SCHEDULE_MESSAGE;
}

const EmptyItem = ({ messageType }: EmptyItemProps) => {
  const { title, suggestion } = SCHEDULE_MESSAGE[messageType];

  return (
    <div className="flex h-[calc(100vh-24rem)] w-full grow flex-col items-center justify-center gap-3 text-black-200">
      <Icon name="mainCharacter" className="w-24 web:w-28" />
      <h3 className="text-1.1 font-bold text-primary-500">{title}</h3>
      <p className="whitespace-pre-line text-center text-0.9 leading-6 text-black-500">
        {suggestion}
      </p>
    </div>
  );
};

export default EmptyItem;
