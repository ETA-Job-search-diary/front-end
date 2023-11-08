interface ChipProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

const Chip = ({ label, checked, onClick }: ChipProps) => {
  return (
    <div className={`${getChipStyle(checked)}`} onClick={onClick}>
      <span>{label}</span>
    </div>
  );
};

export const defaultChipStyle =
  'rounded-full cursor-pointer border text-center text-xxs web:text-sm w-20 xs:w-14 web:w-[104px] xs:h-6 xs:leading-6 h-8 leading-8 web:h-10 web:leading-10';
const getChipStyle = (checked: boolean) => {
  return checked
    ? `${defaultChipStyle} border-primary500 text-primary500`
    : `${defaultChipStyle} border-black100 text-black900`;
};

export default Chip;
