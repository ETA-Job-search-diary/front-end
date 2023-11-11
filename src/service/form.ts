import { PLATFORM } from '@/constants/form';

export const getPlatformFromLink = (link: string): string | null => {
  const foundPlatform = Object.values(PLATFORM).find((platform) =>
    platform.value?.some((value) => link.includes(value)),
  );
  return foundPlatform ? foundPlatform.name : null;
};
