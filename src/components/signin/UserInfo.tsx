import SocialIcon from '@/assets/SocialIcon';
import { getProviderByEmail } from '@/service/signin';
import useSWR from 'swr';
import PassRate from './PassRate';
import StatisticsSection from './StatisticsSection';
import StepStatistics from './StepStatistics';

interface UserInfoProps {
  user?: {
    name: string;
    email: string;
  };
}

const UserInfo = ({ user }: UserInfoProps) => {
  const { data: statistics } = useSWR('/schedules/statistics');
  const { data: passRate } = useSWR('/schedules/passRate');
  const provier = getProviderByEmail(user?.email ?? '');

  return (
    <>
      <section className="flex h-20 flex-col justify-center gap-2 rounded-xl border border-black-100 bg-white px-4 py-5 web:h-[115px] web:px-6">
        <h1 className="text-1.1 font-bold text-black-900">{user?.name}</h1>
        <div className="flex items-start gap-2">
          <SocialIcon name={provier?.name} size="sm" />
          <p className="text-1 leading-3 text-black-600">{user?.email}</p>
        </div>
      </section>
      <PassRate {...passRate} />
      <StatisticsSection label="application">
        <StepStatistics statistics={statistics} />
      </StatisticsSection>
    </>
  );
};

export default UserInfo;
