import Icon from '@/assets/Icon';

interface SignOutButtonProps {
  onClick: () => void;
}

const SignOutButton = ({ onClick }: SignOutButtonProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 border-b border-black100 p-5"
      onClick={onClick}
    >
      <Icon name={'logout'} className="h-4 w-5 stroke-black300" />
      <span className="text-xs text-black900">{'로그아웃'}</span>
    </button>
  );
};

export default SignOutButton;
