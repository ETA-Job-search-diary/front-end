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
    <div className="grow h-full w-full flex flex-col justify-center items-center gap-1 text-black200">
      <Icon name="defaultCharacter" className="w-6 h-6 xs:w-5 xs:h-5" />
      <h3 className="text-xs font-bold">{content}</h3>
      <p className="text-xxs text-center">
        {suggestion}
        <br />
        {suggestAlt && suggestAlt}
      </p>
    </div>
  );
};

export default EmptyItem;
