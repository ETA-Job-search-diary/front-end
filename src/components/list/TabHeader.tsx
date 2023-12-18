export type EventType = 'UPCOMING' | 'COMPLETED';

const eventTypes: { type: EventType; name: string }[] = [
  {
    type: 'UPCOMING',
    name: '다가오는 일정',
  },
  {
    type: 'COMPLETED',
    name: '완료된 일정',
  },
];

interface TabHeaderProps {
  current: EventType;
  upcomingCount?: number;
  completedCount?: number;
  onSwitch: (type: EventType) => void;
}

const TabHeader = ({
  current,
  upcomingCount,
  completedCount,
  onSwitch,
}: TabHeaderProps) => {
  return (
    <div className="relative flex w-full justify-between">
      {eventTypes.map(({ type, name }) => {
        const count = type === 'UPCOMING' ? upcomingCount : completedCount;
        const isActive = current === type;
        return (
          <button
            key={type}
            className={`text-1 h-16 w-full border-b-[2px] border-black100 font-bold ${
              isActive ? 'text-black900' : 'text-black300'
            }`}
            onClick={() => onSwitch(type)}
          >
            <span className="pr-1">{name}</span>
            <span>{count}</span>
          </button>
        );
      })}
      <p
        className={`absolute bottom-0 w-1/2 border-b-[2px] border-primary500 transition-all duration-200 ease-linear ${
          current === 'UPCOMING' ? '' : 'translate-x-full'
        }`}
      />
    </div>
  );
};

export default TabHeader;
