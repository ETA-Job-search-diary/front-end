import Icon from '@/assets/Icon';

export default function loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex gap-8 web:gap-12">
        <Icon
          name="union1"
          className="h-6 w-6 animate-jumpUp web:h-[30px] web:w-[30px]"
        />
        <Icon
          name="union2"
          className="h-6 w-6 animate-jumpDown web:h-[30px] web:w-[30px]"
        />
        <Icon
          name="union3"
          className="h-6 w-6 animate-jumpUp web:h-[30px] web:w-[30px]"
        />
      </div>
    </div>
  );
}
