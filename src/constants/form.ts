import { FormIdType } from '@/model/form';

export enum SiteType {
  SARAMIN = 'saram', // https://www.saramin.co.kr
  JOBKOREA = 'jobkorea', // https://www.jobkorea.co.kr/Recruit/
  JOBPLANET = 'jobplanet', // https://www.jobplanet.co.kr/job
  WANTED = 'wanted', // https://www.wanted.co.kr/company
  ROCKETPUNCH = 'rocketpunch', // https://www.rocketpunch.com/companies/
  PROGRAMMERS = 'programmers', // https://career.programmers.co.kr/job_positions/
  INCRUIT = 'incruit', // https://job.incruit.com/
  WORKNET = 'worknet', // https://www.work.go.kr/
  LINKEDIN = 'linkedin', // https://www.linkedin.com/jobs/search
  REMEMBER = 'remember', // https://career.rememberapp.co.kr/
  BLINDHIRE = 'blindhire', // https://www.blindhire.co.kr/
  JASOSEOL = 'jasoseol', // https://jasoseol.com/
  SUPEROOKIE = 'superookie', //https://www.superookie.com/
  INTHISWORK = 'inthistwork', // https://inthistwork.com/
}

export const PLATFORM: Record<
  SiteType,
  {
    value: string[];
    name: string;
  }
> = {
  [SiteType.SARAMIN]: { value: ['saramin', 'saram.in'], name: '사람인' },
  [SiteType.JOBKOREA]: { value: ['jobkorea'], name: '잡코리아' },
  [SiteType.JOBPLANET]: { value: ['jobplanet'], name: '잡플래닛' },
  [SiteType.WANTED]: { value: ['wanted', 'wntd'], name: '원티드' },
  [SiteType.ROCKETPUNCH]: { value: ['rocketpunch'], name: '로켓펀치' },
  [SiteType.PROGRAMMERS]: { value: ['programmers'], name: '프로그래머스' },
  [SiteType.INCRUIT]: { value: ['incruit'], name: '인크루트' },
  [SiteType.WORKNET]: { value: ['worknet'], name: '워크넷' },
  [SiteType.LINKEDIN]: { value: ['linkedin'], name: '링크드인' },
  [SiteType.REMEMBER]: { value: ['remember'], name: '리멤버' },
  [SiteType.BLINDHIRE]: { value: ['blindhire'], name: '블라인드하이어' },
  [SiteType.JASOSEOL]: { value: ['jasoseol'], name: '자소설닷컴' },
  [SiteType.SUPEROOKIE]: { value: ['superookie'], name: '슈퍼루키' },
  [SiteType.INTHISWORK]: { value: ['inthistwork'], name: '인디스워크' },
};

export const StepType = {
  DOCUMENT: '서류전형',
  ASSIGNMENT: '사전과제',
  WRITTEN: '필기전형',
  FIRST: '1차면접',
  SECOND: '2차면접',
  PERSONALITY: '인적성',
  ETC: '기타',
};
//TODO: 타입 구체화
export const STEPS: {
  value: string;
  name: string;
}[] = [
  { value: 'document', name: StepType.DOCUMENT },
  { value: 'assignment', name: StepType.ASSIGNMENT },
  { value: 'written', name: StepType.WRITTEN },
  { value: 'first', name: StepType.FIRST },
  { value: 'second', name: StepType.SECOND },
  { value: 'personality', name: StepType.PERSONALITY },
  { value: 'etc', name: StepType.ETC },
];

export enum FormType {
  COMPANY = '회사',
  POSITION = '직무',
  DATE = '시간',
  LINK = '채용공고',
  MEMO = '메모',
}

export const ERROR: Record<Partial<FormIdType>, string> = {
  title: '타이틀을 입력해주세요.',
  step: '전형단계를 선택해주세요.',
  company: '회사명을 입력해주세요.',
  position: '직무를 입력해주세요.',
  date: '일정을 입력해주세요.',
  link: '링크를 입력해주세요.',
  platform: '플랫폼을 선택해주세요.',
  memo: '메모를 입력해주세요.',
};
