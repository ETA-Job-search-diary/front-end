interface BadgeProps {
  label: string;
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="w-max whitespace-nowrap px-1 web:px-[6px] web:py-[1px] rounded-small bg-primary50 text-primary500 font-medium text-xxs web:text-xs">
      {label}
    </div>
  );
};

export default Badge;
