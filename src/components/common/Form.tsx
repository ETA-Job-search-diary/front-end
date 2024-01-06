'use client';

import { PLACE_HOLDER } from '@/constants/form';
import { REGEX } from '@/constants/regex';
import useScheduleList from '@/hook/scheduleList';
import useCrawler from '@/hook/useCrawler';
import useSession from '@/hook/useSession';
import useShowToast from '@/hook/useShowToast';
import { ScheduleDetailType } from '@/model/schedule';
import { getFormattedISODateTime } from '@/service/date';
import { ScheduleDataType, postSchedule } from '@/service/schedule';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import GridChips from '../list/GridChips';
import NewNavBar from '../navbar/NewNavBar';
import DateTimePicker from './DateTimePicker';
import FormLabel from './FormLabel';
import TextArea from './TextArea';
import TextInput from './TextInput';
import TextInputWithReset from './TextInputWithReset';

const TEXTAREA_MAX_LENGTH = 200;

type FormValues = {
  step: string;
  link: string;
  platform: string;
  company: string;
  position: string;
  date: string;
  memo: string;
};

type PostFormValues = FormValues & { title: string };

interface FormProps {
  originData?: ScheduleDetailType;
}

const Form = ({ originData }: FormProps) => {
  const { fullDate: currentDate } = getFormattedISODateTime();
  const { refresh, replace } = useRouter();
  const { showTokenExpirationToast } = useShowToast();
  const { token } = useSession();
  const { mutate, setEditSchedule } = useScheduleList([]);
  const { isCrawling, crawlLink } = useCrawler();

  let isPasted = false;

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      step: originData?.step ?? '',
      link: originData?.link ?? '',
      platform: originData?.platform ?? '',
      company: originData?.company ?? '',
      position: originData?.position ?? '',
      date: originData?.date ?? currentDate,
      memo: originData?.memo ?? '',
    },
  });

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const getCrawlingInfo = async (link: string) => {
    const { company, position, platform } = await crawlLink(link);
    setValue('company', company);
    setValue('position', position);
    setValue('platform', platform);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!token) {
      showTokenExpirationToast();
      return;
    }

    const { link, memo, ...rest } = data;
    const postData: PostFormValues = {
      ...rest,
      title: ' ',
      link: link || ' ',
      memo: memo || ' ',
    };

    if (originData) {
      const isEdit = Object.keys(originData).some(
        (key) =>
          originData[key as keyof ScheduleDetailType] !==
          postData[key as keyof PostFormValues],
      );
      if (isEdit) editSchedule(originData.id, postData, token);
      replace(`/schedule/${originData.id}`);
      return;
    }
    newSchedule(postData, token);
  };

  const editSchedule = async (
    id: string,
    data: ScheduleDataType,
    token: string,
  ) => {
    return setEditSchedule(id, data, token).then(() => {
      replace(`/schedule/${id}`);
      refresh();
    });
  };

  // TODO: (기획) api로 통신해서 id를 받아와서 상세화면으로 이동?
  const newSchedule = async (data: ScheduleDataType, token: string) => {
    return postSchedule(data, token).then(() => {
      replace('/list');
      mutate();
    });
  };

  const resetCrawlingValues = () => {
    setValue('link', '');
    setValue('platform', '');
    setValue('company', '');
    setValue('position', '');
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <form
          className="pb-8 pt-[calc(env(safe-area-inset-top))]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <NewNavBar hasOrigin={!!originData} isValid={isValid} />
          <div className="flex flex-col gap-12 px-page web:px-[28px]">
            {/* 전형 단계 */}
            <Controller
              control={control}
              name="step"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormLabel must label="전형단계">
                  <GridChips
                    checked={[value]}
                    onClick={(step: string) => {
                      if (step === value) {
                        onChange('');
                        return;
                      }
                      onChange(step);
                    }}
                  />
                </FormLabel>
              )}
            />

            {/* 채용공고 - 플랫폼 */}
            <div className="flex flex-col gap-3">
              <Controller
                control={control}
                name="link"
                rules={{
                  required: true,
                  pattern: {
                    value: REGEX.URL,
                    message: 'URL형식에 맞게 입력해주세요',
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormLabel
                    id="link"
                    must
                    label="채용공고"
                    message={
                      value.length > 0 && watch('platform')
                        ? '플랫폼 정보를 확인 후 저장해주세요'
                        : '채용공고 링크를 넣으면 정보를 자동으로 가져와요 :)'
                    }
                    errorMessage={error?.message}
                    className="relative"
                  >
                    <TextInputWithReset
                      id="link"
                      type="url"
                      value={value}
                      placeholder={`${PLACE_HOLDER.LINK}`}
                      onResetInput={() => {
                        resetCrawlingValues();
                        onChange('');
                      }}
                      onKeyDown={handleKeyDown}
                      onPaste={async (e: ClipboardEvent<HTMLInputElement>) => {
                        if (!e.clipboardData) return;
                        const link = e.clipboardData.getData('text');
                        const index = link.indexOf('http');
                        const linkWithoutSpace = link.slice(index);

                        if (!REGEX.URL.test(linkWithoutSpace)) return;
                        isPasted = true;
                        await getCrawlingInfo(linkWithoutSpace);
                        setValue('link', linkWithoutSpace);
                        isPasted = false;
                      }}
                      onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.currentTarget;
                        onChange(value);
                        if (isPasted || !REGEX.URL.test(value)) return;
                        await getCrawlingInfo(value);
                        setValue('link', value);
                      }}
                    />
                  </FormLabel>
                )}
              />
              {!!watch('link') && (
                <Controller
                  control={control}
                  name="platform"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormLabel id="platform" className="relative">
                      <TextInput
                        id="platform"
                        placeholder={PLACE_HOLDER.PLATFORM}
                        isLoading={isCrawling}
                        disabled={isCrawling}
                        onKeyDown={handleKeyDown}
                        {...field}
                      />
                    </FormLabel>
                  )}
                />
              )}
            </div>

            {/* 회사 - 직무 */}
            <Controller
              control={control}
              name="company"
              rules={{ required: true }}
              render={({ field }) => (
                <FormLabel
                  id="company"
                  must
                  label="지원하는 회사"
                  className="relative"
                >
                  <TextInput
                    id="company"
                    placeholder={`${PLACE_HOLDER.COMPANY}`}
                    isLoading={isCrawling}
                    disabled={isCrawling}
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormLabel>
              )}
            />
            <Controller
              control={control}
              name="position"
              rules={{ required: true }}
              render={({ field }) => (
                <FormLabel
                  id="position"
                  must
                  label="지원 직무"
                  className="relative"
                >
                  <TextInputWithReset
                    id="position"
                    placeholder={`${PLACE_HOLDER.POSITION}`}
                    onResetInput={() => {
                      setValue('position', '');
                    }}
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormLabel>
              )}
            />

            {/* 일정 */}
            <Controller
              control={control}
              name="date"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormLabel
                  id="date"
                  must
                  label="일정"
                  message={PLACE_HOLDER.DATE}
                >
                  <DateTimePicker
                    date={value}
                    onChange={(datetime: string) => {
                      onChange(datetime);
                    }}
                  />
                </FormLabel>
              )}
            />

            {/* 메모 */}
            <Controller
              control={control}
              name="memo"
              rules={{ maxLength: TEXTAREA_MAX_LENGTH }}
              render={({ field }) => (
                <FormLabel id="memo" label="메모">
                  <TextArea
                    id="memo"
                    placeholder={`${PLACE_HOLDER.MEMO} (최대 ${TEXTAREA_MAX_LENGTH}자)`}
                    maxLength={TEXTAREA_MAX_LENGTH}
                    {...field}
                  />
                </FormLabel>
              )}
            />
          </div>
        </form>
      )}
    </>
  );
};

export const formLabelStyle =
  'font-semibold w-max text-1 xs:text-0.85 text-black-900';
export const formTextStyle = 'text-0.95 text-black-900';
export const formPlaceholderStyle = 'text-black-300';

export default Form;
