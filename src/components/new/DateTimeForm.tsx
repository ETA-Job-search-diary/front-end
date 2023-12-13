import { PlaceholderTypes } from '@/constants/form';
import DateTimePicker from '../common/DateTimePicker';
import FormLabel from '../common/FormLabel';

interface DateTimeFormProps {
  date: string;
  time: string;
  onChangeDateTime: (date: string, time: string) => void;
}

const DateTimeForm = ({ date, time, onChangeDateTime }: DateTimeFormProps) => {
  return (
    <FormLabel must label="일정" message={PlaceholderTypes.DATE}>
      <DateTimePicker date={date} time={time} onChange={onChangeDateTime} />
    </FormLabel>
  );
};

export default DateTimeForm;
