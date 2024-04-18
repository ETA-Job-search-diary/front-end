import Icon from '@/assets/Icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import '@/style/ios-picker.css';
import { useState } from 'react';
import Button from '../common/Button';
import IosPicker from '../common/IsoPicker';

interface Props {
  currentMonth: string;
  onMonthChange: (year: number, month: number) => void;
}

const CaptionPicker = ({ currentMonth, onMonthChange }: Props) => {
  const [year, month] = currentMonth.split('-').map(Number);

  const [newYear, setNewYear] = useState(year);
  const [newMonth, setNewMonth] = useState(month);

  const handlePickerChange = (year: number, month: number) => {
    onMonthChange(year, month);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-200 hover:bg-primary-100 xs:h-4 xs:w-4 xs:rounded-sm">
          <Icon name="arrowdown" className="w-2.5 xs:w-1.5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex flex-col gap-4 rounded-t-3xl bg-white px-8 pb-[calc(env(safe-area-inset-bottom)+2rem)]"
      >
        <div className="embla">
          <IosPicker
            // 현재로부터 앞뒤로 10년
            currentValue={year}
            slideCount={24}
            perspective="left"
            label="년"
            onChange={(value) => setNewYear(value)}
          />
          <IosPicker
            // 현재로부터 앞뒤로 6
            currentValue={month}
            slideCount={12}
            perspective="right"
            label="월"
            loop
            onChange={(value) => setNewMonth(value)}
          />
        </div>
        <Button
          width="full"
          size="md"
          variant="primary"
          label="확인"
          onClick={() => handlePickerChange(newYear, newMonth)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CaptionPicker;
