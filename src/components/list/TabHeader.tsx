export type EventType = 'upcoming' | 'past';

const eventTypes: { type: EventType; name: string }[] = [
  {
    type: 'upcoming',
    name: '다가오는 일정',
  },
  {
    type: 'past',
    name: '지난 일정',
  },
];

interface TabHeaderProps {
  current: EventType;
  upcomingCount?: number;
  pastCount?: number;
  onSwitch: (type: EventType) => void;
}

const TabHeader = ({
  current,
  upcomingCount,
  pastCount,
  onSwitch,
}: TabHeaderProps) => {
  return (
    <div className="fixed top-0 flex w-full min-w-[280px] max-w-[500px] justify-between bg-white pt-safe-top">
      {eventTypes.map(({ type, name }) => {
        const count = type === 'upcoming' ? upcomingCount : pastCount;
        const isActive = current === type;
        const handleClick = () => onSwitch(type);
        return (
          <button
            key={type}
            className={`border-black100 h-16 w-full border-b-[2px] text-1 font-bold ${
              isActive ? 'text-black900' : 'text-black300'
            }`}
            onClick={handleClick}
          >
            <span className="pr-1">{name}</span>
            <span>{count}</span>
          </button>
        );
      })}
      <p
        className={`border-primary500 absolute bottom-0 w-1/2 border-b-[2px] transition-all duration-200 ease-linear ${
          current === 'upcoming' ? '' : 'translate-x-full'
        }`}
      />
    </div>
  );
};

export default TabHeader;
