import { PlaceholderTypes } from '@/constants/form';
import FormLabel from '../common/FormLabel';
import TextInputWithReset from '../common/TextInputWithReset';
import TextInput from '../common/TextInput';
import { ChangeEvent } from 'react';

interface LinkFormProps {
  link: string;
  platform: string;
  autoPlatform?: string;
  isLinkValid: boolean;
  onChangeLink: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePlatform: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const LinkForm = ({
  link,
  platform,
  autoPlatform,
  isLinkValid,
  onChangeLink,
  onChangePlatform,
  onReset,
}: LinkFormProps) => {
  return (
    <FormLabel
      must={false}
      id="link-platform"
      label="채용공고"
      message={`${
        isLinkValid && autoPlatform
          ? '채용플랫폼 정보를 확인 후 저장해주세요'
          : ''
      }`}
      errorMessage={`${
        !!link.length && !isLinkValid && !autoPlatform
          ? 'URL형식에 맞게 입력해주세요'
          : ''
      }`}
    >
      <TextInputWithReset
        id="link"
        type="url"
        value={link}
        onChange={onChangeLink}
        placeholder={PlaceholderTypes.LINK}
        onReset={onReset}
      />
      {link && (
        <TextInput
          id="platform"
          value={platform}
          onChange={onChangePlatform}
          placeholder={autoPlatform || PlaceholderTypes.PLATFORM}
        />
      )}
    </FormLabel>
  );
};

export default LinkForm;
