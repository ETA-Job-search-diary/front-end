import UserProfileWidget from './UserProfileWidget';

const ServiceTitle = () => {
  return (
    <div className="w-full h-max flex flex-col gap-1 web:gap-2 px-8 web:px-11 pt-7 web:pt-11 pb-3 web:pb-5">
      <UserProfileWidget />
      <p className="text-black700 font-light text-sm xs:text-xs">
        이제 <span className="text-primary500 font-semibold">취준로그</span>
        에서 취준 일정을
        <br />
        쉽고 편하게 관리해보세요
      </p>
    </div>
  );
};

export default ServiceTitle;
