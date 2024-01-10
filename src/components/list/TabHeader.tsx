export type EventType = 'coming' | 'past';

const eventTypes: { type: EventType; name: string }[] = [
  {
    type: 'coming',
    name: '다가오는 일정',
  },
  {
    type: 'past',
    name: '지난 일정',
  },
];

interface TabHeaderProps {
  current: EventType;
  comingCount?: number;
  pastCount?: number;
  onSwitch: (type: EventType) => void;
}

const TabHeader = ({
  current,
  comingCount,
  pastCount,
  onSwitch,
}: TabHeaderProps) => {
  return (
    <div className="fixed top-0 flex w-full min-w-[280px] max-w-[500px] justify-between bg-white pt-safe-top">
      {eventTypes.map(({ type, name }) => {
        const count = type === 'coming' ? comingCount : pastCount;
        const isActive = current === type;
        const handleClick = () => onSwitch(type);
        return (
          <button
            key={type}
            className={`h-16 w-full border-b-[2px] border-black-200 text-1 font-bold`}
            onClick={handleClick}
          >
            <span
              className={`pr-1 ${
                isActive ? 'text-black-900' : 'text-black-600'
              }`}
            >
              {name}
            </span>
            <span>{count}</span>
          </button>
        );
      })}
      <p
        className={`absolute bottom-0 w-1/2 border-b-[2px] border-primary-500 transition-all duration-200 ease-linear ${
          current === 'coming' ? '' : 'translate-x-full'
        }`}
      />
    </div>
  );
};

export default TabHeader;
