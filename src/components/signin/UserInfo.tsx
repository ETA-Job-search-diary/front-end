import Icon from '@/assets/Icon';
import { mockUserInfo } from '@/mock/user';
import { getProviderByEmail } from '@/service/signin';
import PassRate from './PassRate';
import StatisticsSection from './StatisticsSection';
import StepStatistics from './StepStatistics';

//TODO: mock data 없애고 실제 유저 정보 받아오기 (지원현황, 합격률)
const UserInfo = () => {
  const { name, email, passRate, statistics } = mockUserInfo;
  return (
    <>
      <section className="flex h-20 flex-col justify-center gap-2 rounded-xl border border-black-100 bg-white px-4 py-5 web:h-[115px] web:px-6">
        <h1 className="text-1.2 font-bold text-black-900">{name}</h1>
        <div className="flex items-start gap-2">
          <span>
            <Icon
              name={`${getProviderByEmail(email).name}`}
              className="h-[0.9rem] w-[0.9rem]"
            />
          </span>
          <span className="text-1 leading-3 text-black-600">{email}</span>
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
