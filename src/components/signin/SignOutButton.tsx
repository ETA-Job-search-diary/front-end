import Icon from '@/assets/Icon';

interface SignOutButtonProps {
  onClick: () => void;
}

const SignOutButton = ({ onClick }: SignOutButtonProps) => {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-5 border-b border-black100"
      onClick={onClick}
    >
      <Icon name={'logout'} className="w-5 h-4 stroke-black300" />
      <span className="text-xs text-black900">{'로그아웃'}</span>
    </button>
  );
};

export default SignOutButton;
