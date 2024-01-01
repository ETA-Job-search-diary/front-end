import { STEPS } from '@/constants/form';
import { REGEX } from '@/constants/regex';
import axios from 'axios';

export const isValidUrl = (url: string): boolean => {
  return REGEX.URL.test(url);
};

export const getStepByValue = (value: string): string => {
  return STEPS.find((step) => step.type === value)?.name || '';
};

export const getCrawlingData = async (url: string, platform: string) => {
  const { data } = await axios.post('/api/crawling', { url, platform });
  return data;
};
