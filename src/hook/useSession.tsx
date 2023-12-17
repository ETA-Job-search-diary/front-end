import { useSession as useAuthSession } from 'next-auth/react';

const useSession = () => {
  const { data } = useAuthSession();
  const user = data?.user;
  const token = user?.accessToken;

  return {
    user,
    token,
  };
};

export default useSession;
