import { PLATFORM } from '@/constants/form';

export const getPlatformBy = (url: string): string | undefined => {
  const foundPlatform = Object.values(PLATFORM).find(
    (platform) => platform.value?.some((value) => url.includes(value)),
  );
  return foundPlatform ? foundPlatform.name : undefined;
};

export const getCompanyBy = (
  title: string,
  platform: string,
  description: string,
) => {
  switch (platform) {
    case '사람인':
      return description.split(',')[0];
    case '잡코리아':
    case '잡플래닛':
    case '로켓펀치':
    case '자소설닷컴': {
      const index = title.indexOf('채용');
      return index > 0 ? title.slice(0, index).trim() : title;
    }
    case '원티드': {
      const matchResult = title.match(/\[([^\]]+)\]/);
      return matchResult?.[1].trim() || title;
    }
    case '점핏': {
      return description.split('-')[0].trim();
    }
    case '링크드인': {
      const index = title.indexOf('hiring');
      return title.slice(0, index).trim();
    }
    case '리멤버':
      return title.split('-')[0].trim();
    case '블라인드하이어':
      return title.split(']')[0].trim();

    case '인디스워크':
      return title.split('·')[0].trim();
    default:
      return title;
  }
};
