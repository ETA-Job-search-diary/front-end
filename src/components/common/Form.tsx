// 'use client';

// import { useRouter } from 'next/navigation';
// import TextArea from './TextArea';
// import TextInput from './TextInput';
// import Chip from './Chip';
// import { ChangeEvent, useState } from 'react';
// import ChipInput from './ChipInput';
// import Button from './Button';
// import FormLabel from './FormLabel';
// import { ERROR, STEPS } from '@/constants/form';
// import { getPlatformFromLink } from '@/service/form';
// import Alert, { AlertType } from './Alert';

// //!! //TODO: 임시저장기능, 수정기능, 일정 입력!!
// const Form = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [steps, setSteps] = useState('');
//   const [company, setCompany] = useState('');
//   const [position, setPosition] = useState('');
//   const [link, setLink] = useState('');
//   const [platform, setPlatform] = useState('');
//   const [memo, setMemo] = useState('');
//   const [isReadyForSubmit, setIsReisReadyForSubmit] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(false);

//   const autoPlatform = getPlatformFromLink(link);

//   const isReady =
//     title.length > 0 &&
//     steps.length > 0 &&
//     company.length > 0 &&
//     position.length > 0;

//   const handleChipClick = (value: string) => {
//     if (steps === value) setSteps('');
//     else setSteps(value);
//   };

//   const handleChipInputClick = () => setSteps('');

//   const handleStepChange = (value: string) => setSteps(value);

//   const handleSubmit = () => {
//     if (!isReady) {
//       setIsReisReadyForSubmit(true);
//       setErrorMessage(true);
//       return;
//     }

//     const data = {
//       title,
//       steps,
//       position,
//       link,
//       platform: platform || autoPlatform,
//       memo,
//     };
//     console.log(data); // TODO: POST 성공시 리스트로 이동
//     router.push('/list');
//   };

//   return (
//     <>
//       <form className="flex flex-col justify-between gap-7 web:gap-10 py-3 web:py-6">
//         <TextInput
//           must
//           id="title"
//           type="text"
//           label="타이틀"
//           placeholder="타이틀을 입력해주세요"
//           isError={errorMessage && !title.length}
//           onChange={(e) => setTitle(e.currentTarget.value)}
//         />
//         <FormLabel
//           must
//           id="step"
//           label="전형단계"
//           errorMessage={errorMessage && !steps.length ? ERROR.step : ''}
//         >
//           <ul className="grid grid-cols-4 gap-3 xs:gap-1 xs:grid-cols-3">
//             {STEPS.map(({ value, name }) => (
//               <li key={value}>
//                 <Chip
//                   label={name}
//                   checked={steps === value}
//                   onClick={() => handleChipClick(value)}
//                 />
//               </li>
//             ))}
//             <ChipInput
//               current={steps}
//               onClick={handleChipInputClick}
//               onTextInput={handleStepChange}
//             />
//           </ul>
//         </FormLabel>
//         <div className="flex flex-col">
//           <TextInput
//             must
//             id="company"
//             label="지원하는 회사/직무"
//             type="text"
//             placeholder="회사명을 입력해주세요"
//             isError={errorMessage && !company.length}
//             onChange={(e) => setCompany(e.currentTarget.value)}
//           />
//           <TextInput
//             must
//             id="position"
//             type="text"
//             placeholder="직무를 입력해주세요"
//             isError={errorMessage && !position.length}
//             onChange={(e) => setPosition(e.currentTarget.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-7">
//           <TextInput
//             id="link"
//             label="채용공고"
//             type="url"
//             value={link}
//             onChange={(e) => setLink(e.currentTarget.value)}
//             placeholder="지원한 채용 링크를 첨부해 주세요" // TODO: 크롤링해서 자동으로 채워주기
//           />
//           <TextInput
//             id="platform"
//             type="text"
//             value={platform}
//             onChange={(e) => setPlatform(e.currentTarget.value)}
//             placeholder={autoPlatform || '채용공고 사이트를 선택해주세요'} // TODO: 셀렉옵션
//           />
//         </div>
//         <TextArea
//           id="memo"
//           label="메모"
//           placeholder="지원 관련 메모를 남겨 주세요. (최대 200자)"
//           maxLength={200}
//           onChange={(e) => setMemo(e.currentTarget.value)}
//         />
//         <Button label="저장" active onClick={handleSubmit} />
//       </form>
//       {isReadyForSubmit && (
//         <Alert
//           message="필수 입력 항목을 모두 입력해주세요."
//           type={[
//             {
//               value: AlertType.confirm,
//               onClick: () => setIsReisReadyForSubmit(false),
//             },
//           ]}
//         />
//       )}
//     </>
//   );
// };

// export default Form;

// !! 버튼 비활성화 방법

'use client';

import { useRouter } from 'next/navigation';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Chip from './Chip';
import { ChangeEvent, useState } from 'react';
import ChipInput from './ChipInput';
import Button from './Button';
import FormLabel from './FormLabel';
import { ERROR, STEPS } from '@/constants/form';
import { getPlatformFromLink } from '@/service/form';
import Alert, { AlertType } from './Alert';

//TODO: 임시저장기능, 수정기능
const Form = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');
  const [memo, setMemo] = useState('');

  const autoPlatform = getPlatformFromLink(link);

  const isReady =
    title.length > 0 &&
    steps.length > 0 &&
    company.length > 0 &&
    position.length > 0;

  const handleChipClick = (value: string) => {
    if (steps === value) setSteps('');
    else setSteps(value);
  };

  const handleChipInputClick = () => setSteps('');

  const handleStepChange = (value: string) => setSteps(value);

  const handleSubmit = () => {
    if (!isReady) {
      return;
    }

    const data = {
      title,
      steps,
      position,
      link,
      platform: platform || autoPlatform,
      memo,
    };
    console.log(data); // TODO: POST 성공시 리스트로 이동
    router.push('/list');
  };

  return (
    <>
      <form className="flex flex-col justify-between gap-7 web:gap-10 py-3 web:py-6">
        <TextInput
          must
          id="title"
          type="text"
          label="타이틀"
          placeholder="타이틀을 입력해주세요"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <FormLabel must id="step" label="전형단계">
          <ul className="grid grid-cols-4 gap-3 xs:gap-1 xs:grid-cols-3">
            {STEPS.map(({ value, name }) => (
              <li key={value}>
                <Chip
                  label={name}
                  checked={steps === value}
                  onClick={() => handleChipClick(value)}
                />
              </li>
            ))}
            <ChipInput
              current={steps}
              onClick={handleChipInputClick}
              onTextInput={handleStepChange}
            />
          </ul>
        </FormLabel>
        <div className="flex flex-col">
          <TextInput
            must
            id="company"
            label="지원하는 회사/직무"
            type="text"
            placeholder="회사명을 입력해주세요"
            onChange={(e) => setCompany(e.currentTarget.value)}
          />
          <TextInput
            must
            id="position"
            type="text"
            placeholder="직무를 입력해주세요"
            onChange={(e) => setPosition(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-7">
          <TextInput
            id="link"
            label="채용공고"
            type="url"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            placeholder="지원한 채용 링크를 첨부해 주세요" // TODO: 크롤링해서 자동으로 채워주기
          />
          <TextInput
            id="platform"
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.currentTarget.value)}
            placeholder={autoPlatform || '채용공고 사이트를 선택해주세요'} // TODO: 셀렉옵션
          />
        </div>
        <TextArea
          id="memo"
          label="메모"
          placeholder="지원 관련 메모를 남겨 주세요. (최대 200자)"
          maxLength={200}
          onChange={(e) => setMemo(e.currentTarget.value)}
        />
        <Button label="저장" active={isReady} onClick={handleSubmit} />
      </form>
    </>
  );
};

export default Form;
