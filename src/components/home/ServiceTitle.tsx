import UserProfileWidget from './UserProfileWidget';

const ServiceTitle = () => {
  return (
    <div className="flex h-max w-full flex-col gap-1 px-8 pb-3 pt-7 web:gap-2 web:px-11 web:pb-5 web:pt-11">
      <UserProfileWidget />
      <p className="text-black-700 text-1.1 font-light xs:text-1">
        이제 <span className="text-primary-500 font-semibold">취준로그</span>
        에서 취준 일정을
        <br />
        쉽고 편하게 관리해보세요
      </p>
    </div>
  );
};

export default ServiceTitle;
