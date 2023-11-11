import Icon from '@/assets/Icon';

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-6 web:gap-[2.5rem]">
        <Icon
          name="union1"
          className="w-6 h-6 web:w-[30px] web:h-[30px] animate-jumpUp"
        />
        <Icon
          name="union2"
          className="w-6 h-6 web:w-[30px] web:h-[30px] animate-jumpDown"
        />
        <Icon
          name="union3"
          className="w-6 h-6 web:w-[30px] web:h-[30px] animate-jumpUp"
        />
      </div>
    </div>
  );
}
