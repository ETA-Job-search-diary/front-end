import { getPlatformBy } from '@/service/crawling';
import { getCrawlingData } from '@/service/form';
import { useState } from 'react';

const useCrawler = () => {
  const [isCrawling, setIsCrawling] = useState(false);

  const crawlLink = async (link: string) => {
    const platform = getPlatformBy(link);
    if (!platform) return { company: '', position: '', platform: '' };
    try {
      setIsCrawling(true);
      const { company, position } = await getCrawlingData(link, platform);
      return { company, position, platform };
    } catch (error) {
      return { company: '', position: '', platform };
    } finally {
      setIsCrawling(false);
    }
  };

  return { isCrawling, crawlLink };
};

export default useCrawler;
