import { StatisticsType } from '@/components/signin/StepStatistics';
import { STEPS } from '@/constants/form';
import { REGEX } from '@/constants/regex';
import { StepTypes } from '@/model/schedule';
import axios from 'axios';

export const isValidUrl = (url: string): boolean => {
  return REGEX.URL.test(url);
};

export const getStepByValue = (value: StepTypes): string => {
  return STEPS.find((step) => step.type === value)?.name || '';
};

export const getCrawlingData = async (url: string, platform: string) => {
  const { data } = await axios.post('/api/crawling', { url, platform });
  return data;
};

export const getSteps = (step: StepTypes): StatisticsType => {
  switch (step) {
    case 'document':
    case 'assignment':
      return 'documentAssignment';
    case 'personality':
    case 'written':
      return 'personalityWritten';
    case 'first':
    case 'second':
    case 'final':
      return 'interview';
    default:
      return 'etc';
  }
};
