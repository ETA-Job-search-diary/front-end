interface SubScheduleTitleProps {
  label: string;
  count?: number;
}

const SubScheduleTitle = ({ label, count }: SubScheduleTitleProps) => {
  return (
    <div className="xs:text-0.85 text-1.1 flex gap-[10px] pt-1">
      <span className="font-semibold text-black900">{label} 일정</span>
      {!!count && (
        <span className="flex text-black500">
          총<span className="pl-1 font-bold text-primary500">{count}</span>건
        </span>
      )}
    </div>
  );
};

export default SubScheduleTitle;
