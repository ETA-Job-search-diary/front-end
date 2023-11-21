interface SubScheduleTitleProps {
  label: string;
  count?: number;
}

const SubScheduleTitle = ({ label, count }: SubScheduleTitleProps) => {
  return (
    <div className="flex gap-[10px] text-sm xs:text-xxs pt-1">
      <span className="text-black900 font-semibold">{label} 일정</span>
      {!!count && (
        <span className="text-black500 flex">
          총<span className="text-primary500 font-bold pl-1">{count}</span>건
        </span>
      )}
    </div>
  );
};

export default SubScheduleTitle;
