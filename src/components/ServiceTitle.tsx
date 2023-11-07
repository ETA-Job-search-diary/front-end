import LoginUser from './common/LoginUser';

const ServiceTitle = () => {
  return (
    <div className="w-full h-max flex flex-col gap-2 web:gap-5 pl-7 px-7 web:px-[40px] pt-6 web:pt-[73px] pb-5">
      <LoginUser />
      <p className="text-black700 font-light text-sm web:text-xl">
        이제 <span className="text-primary500 font-semibold">취준로그</span>
        에서
        <br />
        취준 일정을 쉽고 편하게
        <br />
        관리해보세요
      </p>
    </div>
  );
};

export default ServiceTitle;
