import { getCrawlingData } from '@/service/form';
import { useState } from 'react';

const useCrawler = () => {
  const [isCrawling, setIsCrawling] = useState(false);

  const crawlLink = async (link: string) => {
    try {
      setIsCrawling(true);
      const { company, platform } = await getCrawlingData(link);
      return { company, platform };
    } catch (error) {
      throw error;
    } finally {
      setIsCrawling(false);
    }
  };

  return { isCrawling, crawlLink };
};

export default useCrawler;
