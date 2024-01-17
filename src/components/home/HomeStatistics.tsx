'use client';

import useSWR from 'swr';
import StepStatistics from '../signin/StepStatistics';

const HomeStatistics = () => {
  const { data: statistics } = useSWR('/schedules/statistics');

  return <StepStatistics statistics={statistics} variant="colorful" />;
};

export default HomeStatistics;
