import Icon from '@/assets/Icon';
import { getProviderByEmail } from '@/service/signin';

interface UserInfoProps {
  name: string;
  email: string;
}

const UserInfo = ({ name, email }: UserInfoProps) => {
  return (
    <div className="bg-ligtht-gray rounded-large flex flex-col justify-center gap-2 h-20 web:h-[115px] px-4 web:px-6">
      <h1 className="text-black900 font-bold text-md">{name}</h1>
      <div className="flex items-start gap-2">
        <span>
          <Icon
            name={`${getProviderByEmail(email).name}`}
            className="w-[0.9rem] h-[0.9rem]"
          />
        </span>
        <span className="text-black600 text-xs leading-3">{email}</span>
      </div>
    </div>
  );
};

export default UserInfo;
