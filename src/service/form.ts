import { PLATFORM } from '@/constants/form';

export const getPlatformFromLink = (link: string): string | null => {
  const foundPlatform = Object.values(PLATFORM).find((platform) =>
    link.includes(platform.value),
  );
  return foundPlatform ? foundPlatform.name : null;
};
