import { ChangeEvent } from 'react';
import FormLabel from '../common/FormLabel';
import TextInput from '../common/TextInput';
import { PlaceholderTypes } from '@/constants/form';

interface CompanyFormProps {
  company: string;
  position: string;
  onChangeCompany: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePosition: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CompanyForm = ({
  company,
  position,
  onChangeCompany,
  onChangePosition,
}: CompanyFormProps) => {
  return (
    <FormLabel id="company-position" must label="지원하는 회사/직무">
      <TextInput
        id="company"
        value={company}
        placeholder={`${PlaceholderTypes.COMPANY}`}
        onChange={onChangeCompany}
      />
      <TextInput
        id="position"
        value={position}
        placeholder={`${PlaceholderTypes.POSITION}`}
        onChange={onChangePosition}
      />
    </FormLabel>
  );
};

export default CompanyForm;
