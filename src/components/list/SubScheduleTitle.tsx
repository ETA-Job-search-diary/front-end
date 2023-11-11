interface SubScheduleTitleProps {
  label: string;
  count: number;
}

const SubScheduleTitle = ({ label, count }: SubScheduleTitleProps) => {
  return (
    <div className="flex gap-[10px] xs:text-xxs text-xs web:text-md">
      <span className="text-black900 font-bold">{label} 일정</span>
      <span className="text-black500">
        총 <span className="text-primary500 font-bold">{count}</span>건
      </span>
    </div>
  );
};

export default SubScheduleTitle;
