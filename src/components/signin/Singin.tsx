import SocialSiginButton from '@/components/signin/SocialSiginButton';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Singin = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  const providers = (await getProviders()) ?? {};

  return (
    <div className="w-1/2 py-40 mx-auto text-center">
      <div className="w-full flex flex-col gap-3 justify-center items-center">
        <SocialSiginButton providers={providers} callbackUrl={'/'} />
      </div>
    </div>
  );
};

export default Singin;
