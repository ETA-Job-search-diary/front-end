import { getCrawlingData } from '@/service/form';
import { useState } from 'react';

const useCrawler = () => {
  const [isCrawling, setIsCrawling] = useState(false);

  const crawlLink = async (link: string) => {
    try {
      setIsCrawling(true);
      const { company, position, platform } = await getCrawlingData(link);
      return { company, position, platform };
    } catch (error) {
      return { company: '', position: '', platform: '' };
    } finally {
      setIsCrawling(false);
    }
  };

  return { isCrawling, crawlLink };
};

export default useCrawler;
