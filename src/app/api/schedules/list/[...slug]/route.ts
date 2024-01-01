import { faker } from '@faker-js/faker';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

const schedules = [
  {
    id: '1',
    step: 'document',
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    status: 'pending',
    date: faker.date.soon(),
    createdAt: faker.date.recent(),
  },
  {
    id: '2',
    step: 'final',
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    status: 'pending',
    date: faker.date.soon(),
    createdAt: faker.date.recent(),
  },
  {
    id: '3',
    step: 'first',
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    status: 'pending',
    date: faker.date.soon(),
    createdAt: faker.date.recent(),
  },
];

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  const [status, query] = slug;

  let data;
  if (status === 'upcoming') {
    const random = Math.floor(Math.random() * 10);
    data = {
      schedules: random % 2 !== 0 ? schedules : [],
      schedulesCount: {
        upcoming: random % 2 !== 0 ? 3 : 0,
        past: 5,
      },
    };
  } else if (status === 'past') {
    data = {
      schedules: [
        {
          id: '4',
          step: 'second',
          company: faker.company.name(),
          position: faker.person.jobTitle(),
          status: 'pending',
          date: faker.date.past(),
          createdAt: faker.date.past(),
        },
        {
          id: '5',
          step: 'assignment',
          company: faker.company.name(),
          position: faker.person.jobTitle(),
          status: 'fail',
          date: faker.date.past(),
          createdAt: faker.date.past(),
        },
        {
          id: '6',
          step: 'document',
          company: faker.company.name(),
          position: faker.person.jobTitle(),
          status: 'pass',
          date: faker.date.past(),
          createdAt: faker.date.past(),
        },
        {
          id: '7',
          step: 'document',
          company: faker.company.name(),
          position: faker.person.jobTitle(),
          status: 'fail',
          date: faker.date.past(),
          createdAt: faker.date.past(),
        },
        {
          id: '8',
          step: 'assignment',
          company: faker.company.name(),
          position: faker.person.jobTitle(),
          status: 'pending',
          date: faker.date.past(),
          createdAt: faker.date.past(),
        },
      ],
      // 무한스크롤에 Count를 같이 받아야할까? 계속 필요한 값인가?
      schedulesCount: {
        upcoming: 3,
        past: 5,
      },
    };
  }

  data?.schedules.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return NextResponse.json(data);
}
