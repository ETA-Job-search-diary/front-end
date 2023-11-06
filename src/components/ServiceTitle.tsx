interface ServiceTitleProps {
  name?: string;
}

const ServiceTitle = ({ name }: ServiceTitleProps) => {
  return (
    <div className="w-max h-max flex flex-col gap-5 pl-7 pt-10 web:pl-[40px] web:pt-[73px] pb-5">
      <h1 className="text-black text-md web:text-2xl">
        안녕하세요:) {name ? `${name}님` : ''}
      </h1>
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
