import Icon from '@/assets/Icon';
import { getProviderByEmail } from '@/service/signin';

interface UserInfoProps {
  name: string;
  email: string;
}

const UserInfo = ({ name, email }: UserInfoProps) => {
  return (
    <section className="border-black-100 flex h-20 flex-col justify-center gap-2 rounded-xl border bg-white px-4 py-5 web:h-[115px] web:px-6">
      <h1 className="text-black-900 text-1.2 font-bold">{name}</h1>
      <div className="flex items-start gap-2">
        <span>
          <Icon
            name={`${getProviderByEmail(email).name}`}
            className="h-[0.9rem] w-[0.9rem]"
          />
        </span>
        <span className="text-black-600 text-1 leading-3">{email}</span>
      </div>
    </section>
  );
};

export default UserInfo;
