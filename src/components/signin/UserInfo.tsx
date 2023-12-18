import Icon from '@/assets/Icon';
import { getProviderByEmail } from '@/service/signin';

interface UserInfoProps {
  name: string;
  email: string;
}

const UserInfo = ({ name, email }: UserInfoProps) => {
  return (
    <div className="flex h-20 flex-col justify-center gap-2 rounded-large bg-ligtht-gray px-4 web:h-[115px] web:px-6">
      <h1 className="text-1.2 font-bold text-black900">{name}</h1>
      <div className="flex items-start gap-2">
        <span>
          <Icon
            name={`${getProviderByEmail(email).name}`}
            className="h-[0.9rem] w-[0.9rem]"
          />
        </span>
        <span className="text-1 leading-3 text-black600">{email}</span>
      </div>
    </div>
  );
};

export default UserInfo;
