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
    <li className="w-full flex flex-col justify-center items-center gap-1 text-black200 rounded-large">
      <Icon name="defaultCharacter" className="w-4 h-4 web:w-6 web:h-6" />
      <h3 className="xs:text-xxs text-xs web:text-sm font-bold">{content}</h3>
      <p className="xs:text-[10px] text-xxs web:text-xs text-center">
        {suggestion}
        <br />
        {suggestAlt && suggestAlt}
      </p>
    </li>
  );
};

export default EmptyItem;
