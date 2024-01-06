import Icon from '@/assets/Icon';
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
//TODO: 병렬로 요청하는게 맞는지 확인 아니면 캐싱하기
const UserInfo = ({ user }: UserInfoProps) => {
  const { data: statistics } = useSWR('/schedules/statistics');
  const { data: passRate } = useSWR('/schedules/passRate');

  return (
    <>
      <section className="flex h-20 flex-col justify-center gap-2 rounded-xl border border-black-100 bg-white px-4 py-5 web:h-[115px] web:px-6">
        <h1 className="text-1.1 font-bold text-black-900">{user?.name}</h1>
        <div className="flex items-start gap-2">
          <span>
            <Icon
              name={`${getProviderByEmail(user?.email ?? '').name}`}
              className="h-[0.9rem] w-[0.9rem]"
            />
          </span>
          <span className="text-1 leading-3 text-black-600">{user?.email}</span>
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
