import Icon from '@/assets/Icon';
import { SCHEDULE_MESSAGE } from '@/constants/schedule';

interface EmptyItemProps {
  messageType: keyof typeof SCHEDULE_MESSAGE;
}

const EmptyItem = ({ messageType }: EmptyItemProps) => {
  const { title, suggestion } = SCHEDULE_MESSAGE[messageType];

  return (
    <div className="text-black200 flex h-[calc(100vh-24rem)] w-full grow flex-col items-center justify-center gap-3">
      <Icon name="mainCharacter" className="w-24 web:w-28" />
      <h3 className="text-primary500 text-1.1 font-bold">{title}</h3>
      <p className="text-black500 whitespace-pre-line text-center text-0.9 leading-6">
        {suggestion}
      </p>
    </div>
  );
};

export default EmptyItem;
