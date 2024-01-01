import { faker } from '@faker-js/faker';

const mockStatistics = {
  document: faker.datatype.number({ min: 2, max: 60 }),
  personality: faker.datatype.number({ min: 0, max: 20 }),
  interview: faker.datatype.number({ min: 0, max: 10 }),
  etc: faker.datatype.number({ min: 0, max: 20 }),
};

const passDocument = faker.datatype.number({
  min: 0,
  max: mockStatistics.document,
});

const passInterview = faker.datatype.number({
  min: 0,
  max: mockStatistics.interview,
});

const total = mockStatistics.document + mockStatistics.interview;
const documentRate = Math.ceil((passDocument / mockStatistics.document) * 100);
const interviewRate = Math.ceil(
  (passInterview / mockStatistics.interview) * 100,
);

export const mockUserInfo = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  passRate: {
    document: documentRate, //  서류전형 합격/불합격 여부 계산​
    interview: interviewRate, // 1차면접, 2차면접. 3차면접 합격/불합격 여부 계산 ​
    total: Math.ceil((3 / total) * 100), // 서류+면접 합격률 평균​
  },
  statistics: mockStatistics,
};
