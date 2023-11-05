interface ServiceTitleProps {
  name?: string;
}

const ServiceTitle = ({ name }: ServiceTitleProps) => {
  return (
    <div className="w-max flex flex-col gap-1 pl-6 pt-10 web:pl-[30px] web:pt-[56px]">
      <h1 className="text-black text-md web:text-xl">
        안녕하세요:) {name ? `${name}님` : ''}
      </h1>
      <p className="text-black80 font-light text-sm web:text-md web:w-[170px] web:h-[84px]">
        이제 <span className="text-primary font-semibold">취준로그</span>에서
        <br />
        취준 일정을 쉽고 편하게
        <br />
        관리해보세요
      </p>
    </div>
  );
};

export default ServiceTitle;
