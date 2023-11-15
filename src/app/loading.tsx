import Icon from '@/assets/Icon';

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-6 web:gap-[2.5rem]">
        <Icon name="union1" className={`${iconStyle} animate-jumpUp}`} />
        <Icon name="union2" className={`${iconStyle} animate-jumpDown}`} />
        <Icon name="union3" className={`${iconStyle} animate-jumpUp}`} />
      </div>
    </div>
  );
}

const iconStyle = 'w-6 h-6 web:w-[30px] web:h-[30px]';
