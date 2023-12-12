import { PLATFORM, STEPS } from '@/constants/form';

export const getPlatformFromLink = (link: string): string | undefined => {
  const foundPlatform = Object.values(PLATFORM).find((platform) =>
    platform.value?.some((value) => link.includes(value)),
  );
  return foundPlatform ? foundPlatform.name : undefined;
};

export const isValidUrl = (url: string): boolean => {
  const regex = new RegExp(
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
  );
  return regex.test(url);
};

export const getBadgeByStep = (stepName: string): string | undefined => {
  if (stepName === 'personality' || stepName === 'etc') return;
  return stepName === 'first' || stepName === 'second'
    ? '면접시간'
    : '마감시간';
};

export const getStepByValue = (value: string): string => {
  return STEPS.find((step) => step.type === value)?.name || '';
};
