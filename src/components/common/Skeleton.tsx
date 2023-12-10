type Size = 'sm' | 'md' | 'lg';
interface SkeletonProps {
  size?: Size;
}

const Skeleton = ({ size = 'sm' }: SkeletonProps) => {
  return (
    <div className={`${SkeletonAnimaion} ${getSkeletonTextStyle(size)}`}></div>
  );
};

Skeleton.List = () => {
  return (
    <ul className="flex flex-col gap-5">
      <Skeleton.Item />
      <Skeleton.Item />
      <Skeleton.Item />
    </ul>
  );
};

Skeleton.Item = () => {
  return (
    <li
      className={`relative w-full bg-white grid grid-cols-[auto_1fr_auto] border border-black100 rounded-large py-3 web:py-6 h-[88px] web:h-[129px] animate-pulse`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-black900 xs:px-3 px-6 web:px-[30px] border-r border-black100">
        <Skeleton />
      </div>
      <div className="w-full flex flex-col justify-center gap-2 xs:pl-3 pl-6 web:pl-[30px]">
        <Skeleton size="sm" />
        <div>
          <Skeleton size="md" />
        </div>
        <Skeleton size="lg" />
      </div>
      <div className="w-full place-self-center xs:pr-3 pr-6 web:pr-[30px]">
        <Skeleton />
      </div>
    </li>
  );
};

const SkeletonAnimaion =
  'before:absolute before:animate-loading before:bg-gradient-to-r before:from-black50 before:via-light before:to-black50 before:h-10 before:w-3/4';

const getSkeletonTextStyle = (size: Size) => {
  const sizes = {
    sm: 'w-10',
    md: 'w-20',
    lg: 'w-32',
  };
  return `relative h-2.5 web:h-3.5 rounded-sm bg-black50 overflow-hidden ${sizes[size]}`;
};

export default Skeleton;
