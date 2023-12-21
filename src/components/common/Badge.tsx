interface BadgeProps {
  isPassed?: boolean;
  label: string;
}

const Badge = ({ isPassed = false, label }: BadgeProps) => {
  return (
    <div
      className={`m-auto h-max w-max whitespace-nowrap rounded-small p-1 text-0.85 font-medium  ${
        isPassed ? 'bg-[#F1F1F1] text-black300' : 'bg-primary50 text-primary500'
      }`}
    >
      {label}
    </div>
  );
};

export default Badge;
