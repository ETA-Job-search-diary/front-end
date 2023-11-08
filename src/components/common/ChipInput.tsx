import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { defaultChipStyle } from './Chip';
import useFocus from '@/hook/useFocus';

interface ChipInputProps extends InputHTMLAttributes<HTMLInputElement> {
  current: string;
  onClick: () => void;
  onTextInput: (value: string) => void;
}

const ChipInput = ({
  current,
  onClick,
  onTextInput,
  ...rest
}: ChipInputProps) => {
  const [value, setValue] = useState('');
  const { onFocus, onBlur } = useFocus();
  const checked = current !== '' && current === value;

  const handleChipnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
    onTextInput(value);
    if (value === '') onBlur();
    else onFocus();
  };

  return (
    <input
      className={`${defaultChipStyle} ${getChipInputStyle(checked)} `}
      onFocus={onFocus}
      onChange={handleChipnChange}
      {...rest}
      placeholder={'직접입력 +'}
    />
  );
};

const getChipInputStyle = (checked: boolean) => {
  const defaultStyle =
    'rounded-full border border-dashed text-center text-xxs web:text-sm w-20 xs:w-14 web:w-[104px] h-8 leading-8 web:h-10 web:leading-10 whitespace-nowrap';
  const checkedStyle = checked
    ? 'border-primary500 text-primary500'
    : 'border-black100 text-black900';

  return `${defaultStyle} ${checkedStyle}`;
};

export default ChipInput;
