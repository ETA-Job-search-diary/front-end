export const PLATFORM = {
  SARAMIN: { value: ['saramin', 'saram.in'], name: '사람인' },
  JOBKOREA: { value: ['jobkorea'], name: '잡코리아' },
  JOBPLANET: { value: ['jobplanet'], name: '잡플래닛' },
  WANTED: { value: ['wanted', 'wntd'], name: '원티드' },
  ROCKETPUNCH: { value: ['rocketpunch'], name: '로켓펀치' },
  PROGRAMMERS: { value: ['programmers'], name: '프로그래머스' },
  INCRUIT: { value: ['incruit'], name: '인크루트' },
  WORKNET: { value: ['worknet'], name: '워크넷' },
  LINKEDIN: { value: ['linkedin'], name: '링크드인' },
  REMEMBER: { value: ['remember'], name: '리멤버' },
  BLINDHIRE: { value: ['blindhire'], name: '블라인드하이어' },
  JASOSEOL: { value: ['jasoseol'], name: '자소설닷컴' },
  SUPEROOKIE: { value: ['superookie'], name: '슈퍼루키' },
  INTHISWORK: { value: ['inthistwork'], name: '인디스워크' },
  JUMPIT: { value: ['jumpit'], name: '점핏' },
};

interface StepInfo {
  value: string;
  name: string;
}

const StepType = {
  DOCUMENT: 'document',
  ASSIGNMENT: 'assignment',
  WRITTEN: 'written',
  PERSONALITY: 'personality',
  FIRST: 'first',
  SECOND: 'second',
  ETC: 'etc',
};

const StepTypes = {
  DOCUMENT: '서류전형',
  ASSIGNMENT: '사전과제',
  WRITTEN: '필기전형',
  PERSONALITY: '인적성',
  FIRST: '1차면접',
  SECOND: '2차면접',
  ETC: '기타',
};

export const STEPS: StepInfo[] = [
  { value: StepType.DOCUMENT, name: StepTypes.DOCUMENT },
  { value: StepType.ASSIGNMENT, name: StepTypes.ASSIGNMENT },
  { value: StepType.WRITTEN, name: StepTypes.WRITTEN },
  { value: StepType.PERSONALITY, name: StepTypes.PERSONALITY },
  { value: StepType.FIRST, name: StepTypes.FIRST },
  { value: StepType.SECOND, name: StepTypes.SECOND },
  { value: StepType.ETC, name: StepTypes.ETC },
];

export type FormIdType =
  | 'title'
  | 'step'
  | 'company'
  | 'position'
  | 'link'
  | 'platform'
  | 'date'
  | 'memo';

export const FormTypes = {
  COMPANY: '회사',
  POSITION: '직무',
  DATE: '시간',
  LINK: '채용공고',
  MEMO: '메모',
  TITLE: '타이틀',
  STEP: '전형단계',
};

export const PlaceholderTypes = {
  TITLE: '타이틀을 입력해주세요',
  COMPANY: '회사명을 입력해주세요',
  POSITION: '직무를 입력해주세요',
  DATE: '서류마감일, 면접일을 입력해주세요',
  LINK: '지원한 채용 링크를 첨부해주세요',
  MEMO: '지원 관련 메모를 남겨주세요',
};
