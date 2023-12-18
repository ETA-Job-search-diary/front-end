interface BadgeProps {
  label: string;
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="text-0.8 web:text-0.85 w-max whitespace-nowrap rounded-small bg-primary50 px-1 font-medium text-primary500 web:px-[6px] web:py-[1px]">
      {label}
    </div>
  );
};

export default Badge;
