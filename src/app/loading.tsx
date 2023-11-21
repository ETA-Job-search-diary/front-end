import Icon from '@/assets/Icon';

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-8 web:gap-12">
        <Icon
          name="union1"
          className="animate-jumpUp w-6 h-6 web:w-[30px] web:h-[30px]"
        />
        <Icon
          name="union2"
          className="animate-jumpDown w-6 h-6 web:w-[30px] web:h-[30px]"
        />
        <Icon
          name="union3"
          className="animate-jumpUp w-6 h-6 web:w-[30px] web:h-[30px]"
        />
      </div>
    </div>
  );
}
