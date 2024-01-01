import { faker } from '@faker-js/faker';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;

  const month = searchParams.get('date');
  if (!month) {
    return new Response('Bad request. 유효하지 않은 요청입니다.', {
      status: 400,
    });
  }

  const steps = ['document', 'personality', 'interview', 'etc']; // 서류과제, 인적성필기, 모든면접, 기타
  const data = [
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },

    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
    {
      company: faker.company.name(),
      date: faker.date.between({ from: month + '-01', to: month + '-29' }),
      step: steps[Math.floor(Math.random() * steps.length)],
    },
  ];

  return NextResponse.json(data);
}
