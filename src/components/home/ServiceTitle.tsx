import LoginUser from './UserProfileWidget';

const ServiceTitle = () => {
  return (
    <div className="w-full h-max flex flex-col gap-2 web:gap-5 px-8 web:px-11 pt-6 web:pt-12 pb-5">
      <LoginUser />
      <p className="text-black700 font-light text-sm web:text-xl">
        이제 <span className="text-primary500 font-semibold">취준로그</span>
        에서 취준 일정을
        <br />
        쉽고 편하게 관리해보세요
      </p>
    </div>
  );
};

export default ServiceTitle;
