interface BadgeProps {
  label: string;
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="w-max whitespace-nowrap rounded-small bg-primary50 px-1 text-xxxs font-medium text-primary500 web:px-[6px] web:py-[1px] web:text-xxs">
      {label}
    </div>
  );
};

export default Badge;
