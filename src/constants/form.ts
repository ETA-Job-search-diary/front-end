import { FormIdType } from '@/model/form';

export enum SiteType {
  SARAMIN = 'saramin', // https://www.saramin.co.kr
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
}

export const PLATFORM: Record<
  SiteType,
  {
    value: string;
    name: string;
  }
> = {
  [SiteType.SARAMIN]: { value: 'saramin', name: '사람인' },
  [SiteType.JOBKOREA]: { value: 'jobkorea', name: '잡코리아' },
  [SiteType.JOBPLANET]: { value: 'jobplanet', name: '잡플래닛' },
  [SiteType.WANTED]: { value: 'wanted', name: '원티드' },
  [SiteType.ROCKETPUNCH]: { value: 'rocketpunch', name: '로켓펀치' },
  [SiteType.PROGRAMMERS]: { value: 'programmers', name: '프로그래머스' },
  [SiteType.INCRUIT]: { value: 'incruit', name: '인크루트' },
  [SiteType.WORKNET]: { value: 'worknet', name: '워크넷' },
  [SiteType.LINKEDIN]: { value: 'linkedin', name: '링크드인' },
  [SiteType.REMEMBER]: { value: 'remember', name: '리멤버' },
  [SiteType.BLINDHIRE]: { value: 'blindhire', name: '블라인드하이어' },
  [SiteType.JASOSEOL]: { value: 'jasoseol', name: '자소설닷컴' },
  [SiteType.SUPEROOKIE]: { value: 'superookie', name: '슈퍼루키' },
};

export const StepType = {
  DOCUMENT: '서류전형',
  ASSIGNMENT: '사전과제',
  WRITTEN: '필기전형',
  FIRST: '1차면접',
  SECOND: '2차면접',
  PERSONALITY: '인적성',
};

export const STEPS = [
  { value: 'document', name: '서류전형 ' },
  { value: 'assignment', name: '사전과제' },
  { value: 'written', name: '필기전형' },
  { value: 'first', name: '1차면접' },
  { value: 'second', name: '2차면접' },
  { value: 'personality', name: '인적성' },
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
