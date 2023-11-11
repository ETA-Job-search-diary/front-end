import Icon from '@/assets/Icon';

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-6 web:gap-[2.5rem]">
        <Icon
          name="union1"
          className="w-6 h-6 web:w-8 web:h-8 animate-jumpUp"
        />
        <Icon
          name="union2"
          className="w-6 h-6 web:w-8 web:h-8 animate-jumpDown"
        />
        <Icon
          name="union3"
          className="w-6 h-6 web:w-8 web:h-8 animate-jumpUp"
        />
      </div>
    </div>
  );
}
