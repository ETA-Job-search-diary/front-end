interface SubScheduleTitleProps {
  label: string;
  count?: number;
}

const SubScheduleTitle = ({ label, count }: SubScheduleTitleProps) => {
  return (
    <div className="flex gap-[10px] pt-1 text-1.1 xs:text-0.85">
      <span className="text-black-900 font-semibold">{label} 일정</span>
      {!!count && (
        <span className="text-black-500 flex">
          총<span className="text-primary-500 pl-1 font-bold">{count}</span>건
        </span>
      )}
    </div>
  );
};

export default SubScheduleTitle;
