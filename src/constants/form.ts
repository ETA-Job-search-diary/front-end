import { StatisticsProps } from '@/components/signin/ApplicationStatistics';
import { PassRateProps } from '@/components/signin/PassRate';

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

export const STEPS = [
  {
    type: 'document',
    name: '서류전형',
  },
  {
    type: 'assignment',
    name: '사전과제',
  },
  {
    type: 'written',
    name: '필기전형',
  },
  {
    type: 'personality',
    name: '인적성',
  },
  {
    type: 'first',
    name: '1차면접',
  },
  {
    type: 'second',
    name: '2차면접',
  },
  {
    type: 'final',
    name: '최종면접',
  },
  {
    type: 'etc',
    name: '기타',
  },
];

export const FormTypes = {
  COMPANY: '회사',
  POSITION: '직무',
  DATE: '일정',
  PLATFORM: '플랫폼',
  LINK: '채용공고',
  MEMO: '메모',
  STEP: '전형단계',
};

export const PlaceholderTypes = {
  COMPANY: '회사명을 입력해주세요',
  POSITION: '직무를 입력해주세요',
  DATE: '서류마감일, 면접일을 입력해주세요',
  LINK: '지원한 채용링크를 붙여넣기 해주세요',
  MEMO: '지원 관련 메모를 남겨주세요',
  PLATFORM: '채용플랫폼을 입력해 주세요',
};

export const STEP_STATISTICS: { type: keyof StatisticsProps; name: string }[] =
  [
    {
      type: 'document',
      name: '서류/과제',
    },
    {
      type: 'personality',
      name: '인적성/필기',
    },
    {
      type: 'interview',
      name: '면접',
    },
    {
      type: 'etc',
      name: '기타',
    },
  ];

export const STEP_RATE: { type: keyof PassRateProps; name: string }[] = [
  {
    type: 'document',
    name: '서류',
  },
  {
    type: 'interview',
    name: '면접',
  },
  {
    type: 'total',
    name: '전체',
  },
];
