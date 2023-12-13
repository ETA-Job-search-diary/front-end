import { PlaceholderTypes } from '@/constants/form';
import FormLabel from '../common/FormLabel';
import TextInputWithReset from '../common/TextInputWithReset';
import TextInput from '../common/TextInput';
import { ChangeEvent, ClipboardEvent } from 'react';

interface LinkFormProps {
  link: string;
  platform: string;
  isLinkValid: boolean;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onChangeLink: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePlatform: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const LinkForm = ({
  link,
  platform,
  isLinkValid,
  onChangeLink,
  onPaste,
  onChangePlatform,
  onReset,
}: LinkFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <FormLabel
        id="link"
        label="채용공고"
        message={`${
          isLinkValid ? '채용플랫폼 정보를 확인 후 저장해주세요' : ''
        }`}
        errorMessage={`${
          !!link.length && !isLinkValid ? 'URL형식에 맞게 입력해주세요' : ''
        }`}
      >
        <TextInputWithReset
          id="link"
          type="url"
          value={link}
          onChange={onChangeLink}
          placeholder={PlaceholderTypes.LINK}
          onReset={onReset}
          onPaste={onPaste}
        />
      </FormLabel>
      {link && (
        <FormLabel id="platform">
          <TextInput
            id="platform"
            value={platform}
            onChange={onChangePlatform}
            placeholder={PlaceholderTypes.PLATFORM}
          />
        </FormLabel>
      )}
    </div>
  );
};

export default LinkForm;
