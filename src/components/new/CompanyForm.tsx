import { ChangeEvent } from 'react';
import FormLabel from '../common/FormLabel';
import TextInput from '../common/TextInput';
import { PlaceholderTypes } from '@/constants/form';

interface CompanyFormProps {
  isLoading: boolean;
  company: string;
  position: string;
  onChangeCompany: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePosition: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CompanyForm = ({
  isLoading,
  company,
  position,
  onChangeCompany,
  onChangePosition,
}: CompanyFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <FormLabel id="company" must label="지원하는 회사/직무">
        <TextInput
          id="company"
          value={company}
          placeholder={`${PlaceholderTypes.COMPANY}`}
          onChange={onChangeCompany}
          isLoading={isLoading}
        />
      </FormLabel>
      <FormLabel id="position">
        <TextInput
          id="position"
          value={position}
          placeholder={`${PlaceholderTypes.POSITION}`}
          onChange={onChangePosition}
        />
      </FormLabel>
    </div>
  );
};

export default CompanyForm;
