export type TabTypes = 'upcoming' | 'past';

const tabs: { tab: TabTypes; name: string }[] = [
  {
    tab: 'upcoming',
    name: '다가오는 일정',
  },
  {
    tab: 'past',
    name: '지난 일정',
  },
];

interface TabHeaderProps {
  current: TabTypes;
  counts: {
    upcoming: number;
    past: number;
  };
  onSwitch: (tab: TabTypes) => void;
}

const TabHeader = ({ current, counts, onSwitch }: TabHeaderProps) => {
  return (
    <div className="relative flex w-full justify-between">
      {tabs.map(({ tab, name }) => {
        const count = tab === 'upcoming' ? counts.upcoming : counts.past;
        const isActive = current === tab;
        return (
          <button
            key={tab}
            className={`border-black-100 h-16 w-full border-b-[2px] text-1 font-bold ${
              isActive ? 'text-black-900' : 'text-black-300'
            }`}
            onClick={() => onSwitch(tab)}
          >
            <span className="pr-1">{name}</span>
            <span>{count}</span>
          </button>
        );
      })}
      <p
        className={`border-primary-500 absolute bottom-0 w-1/2 border-b-[2px] transition-all duration-200 ease-linear ${
          current === 'upcoming' ? '' : 'translate-x-full'
        }`}
      />
    </div>
  );
};

export default TabHeader;
