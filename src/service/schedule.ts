import { STEPS } from '@/constants/form';

export const getBadgeByStep = (stepName: string): string | undefined => {
  if (stepName === 'personality') return;
  return stepName === 'first' || stepName === 'second'
    ? '면접시간'
    : '마감시간';
};

export const getStepByValue = (value: string): string => {
  return STEPS.find((step) => step.value === value)?.name || '';
};
