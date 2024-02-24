import { PLATFORM } from '@/constants/form';

export const getPlatformBy = (url: string): string | undefined => {
  const foundPlatform = Object.values(PLATFORM).find((platform) =>
    platform.value?.some((value) => url.includes(value)),
  );
  return foundPlatform ? foundPlatform.name : undefined;
};

export const getCompanyAndPositionBy = (
  title: string,
  platform: string,
  description: string,
) => {
  const company = processForCompany(title, platform, description);
  const position = processForPosition(title, platform, description);

  if (company && position.includes(company)) {
    return { company, position: position.replace(company, '').trim() };
  }
  return { company, position };
};

export const processForCompany = (
  title: string,
  platform: string,
  description: string,
) => {
  switch (platform) {
    case '사람인':
      return description.split(',')[0];
    case '잡코리아':
    case '잡플래닛':
    case '자소설닷컴': {
      const index = title.indexOf('채용');
      return index > 0 ? title.slice(0, index).trim() : title;
    }
    case '로켓펀치': {
      return title
        .split('|')[1]
        .replace('cancelarr_downarr_upcancel', '')
        .trim();
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
      const matchResult = title.match(/\[([^\]]+)\]/);
      return matchResult?.[1].trim();
    case '인디스워크':
      return title.split('·')[0].trim();
    case '슈퍼루키': {
      return title.split('|')[0].replace('채용', '').trim();
    }
    case '랠릿': {
      return;
    }
    default:
      return title;
  }
};

export const processForPosition = (
  title: string,
  platform: string,
  description: string,
) => {
  switch (platform) {
    case '사람인':
      return description.split(',')[1];
    case '잡플래닛': {
      const index = title.indexOf('채용');
      return index > 0 ? title.slice(index + 2).trim() : title;
    }
    case '로켓펀치': {
      const titleArr = title.split('|')[0];
      const index = titleArr.indexOf('채용');
      return index > 0 ? titleArr.slice(0, index).trim() : titleArr;
    }
    case '원티드': {
      return title.split(/[|\]]/)[1].replace('채용', '').trim();
    }
    case '점핏': {
      return description.split('-')[1].trim();
    }
    case '링크드인': {
      const index = title.indexOf('hiring');
      return title
        .slice(index + 7)
        .split(',')[0]
        .trim();
    }
    case '잡코리아':
    case '리멤버': {
      return title.split(/[|\-]/)[1].trim();
    }
    case '블라인드하이어': {
      const startIndex = title.indexOf(']');
      const endIndex = title.indexOf('채용');
      return title.slice(startIndex + 1, endIndex).trim();
    }
    case '인디스워크':
      return title.split(/[·–]/)[1].trim();
    case '슈퍼루키': {
      return description;
    }
    case '자소설닷컴': {
      return title.split(/-/)[0].replace('채용공고', '').trim();
    }
    case '랠릿': {
      return title.split('-')[0].trim();
    }
    default:
      return title;
  }
};
