import { ChangeEvent, InputHTMLAttributes } from 'react';
import { defaultChipStyle } from './Chip';
import Icon from '@/assets/Icon';
import useFocus from '@/hook/useFocus';

interface ChipInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onReset: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const ChipInput = ({ onReset, onChange, onClick, ...rest }: ChipInputProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  const handleClick = () => {
    onFocus();
    onClick();
  };

  const handleChipnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value === '') onBlur();
    onChange(e);
  };

  return (
    <>
      {isFocus ? (
        <>
          <input
            className={`${defaultChipStyle} ${getChipInputStyle(isFocus)} `}
            onFocus={onFocus}
            {...rest}
            onChange={handleChipnChange}
          />
        </>
      ) : (
        <div
          className={`${defaultChipStyle} ${getChipInputStyle(
            isFocus,
          )} whitespace-nowrap`}
          onClick={handleClick}
        >
          <span className="flex justify-center items-center text-black800">
            직접입력
            <Icon name="plus" className="fill-black800 w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </>
  );
};

const getChipInputStyle = (checked: boolean) => {
  return checked
    ? 'border-dashed border-primary500 text-primary500'
    : 'border-dashed border-black100 text-black900';
};

export default ChipInput;
