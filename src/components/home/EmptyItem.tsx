import Icon from '@/assets/Icon';
import {
  PageType,
  ScheduleMessageType,
  SCHEDULE_MESSAGE,
} from '@/constants/schedule';

interface EmptyItemProps {
  page: PageType;
  messageType: ScheduleMessageType;
}

const EmptyItem = ({ page, messageType }: EmptyItemProps) => {
  const { content, suggestion, suggestAlt } =
    SCHEDULE_MESSAGE[page][messageType];

  return (
    <div className="text-black-200 flex h-full w-full grow flex-col items-center justify-center gap-1">
      <Icon name="defaultCharacter" className="h-6 w-6 xs:h-5 xs:w-5" />
      <h3 className="text-1 font-bold">{content}</h3>
      <p className="text-center text-0.85">
        {suggestion}
        <br />
        {suggestAlt && suggestAlt}
      </p>
    </div>
  );
};

export default EmptyItem;
