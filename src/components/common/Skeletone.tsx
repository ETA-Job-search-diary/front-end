interface SkeletoneProps {
  size?: Size;
}

type Size = 'sm' | 'md' | 'lg';

type SizeProps = Pick<SkeletoneProps, 'size'>;

const Skeletone = () => {
  return <div></div>;
};

Skeletone.List = () => {
  return (
    <ul className="flex flex-col gap-5">
      <Skeletone.Item />
      <Skeletone.Item />
      <Skeletone.Item />
    </ul>
  );
};

Skeletone.Item = () => {
  return (
    <li
      className={`relative grid grid-cols-[auto_1fr_auto] border border-black100 rounded-large py-3 web:py-6 h-[88px] web:h-[129px] animate-pulse`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-black900 xs:px-3 px-6 web:px-[30px] border-r border-black100">
        <Skeletone.Text />
      </div>
      <div className="w-full flex flex-col justify-center gap-2 xs:pl-3 pl-6 web:pl-[30px]">
        <Skeletone.Text size="sm" />
        <div>
          <Skeletone.Text size="md" />
        </div>
        <Skeletone.Text size="lg" />
      </div>
      <div className="w-full place-self-center xs:pr-3 pr-6 web:pr-[30px]">
        <Skeletone.Text />
      </div>
    </li>
  );
};

Skeletone.Text = ({ size = 'sm' }: SizeProps) => {
  return (
    <div className={`${skeletoneAnimaion} ${getSkeletonTextStyle(size)}`}></div>
  );
};

const skeletoneAnimaion =
  'before:absolute before:animate-loading before:bg-gradient-to-r before:from-black50 before:via-light before:to-black50 before:h-10 before:w-3/4';

const getSkeletonTextStyle = (size: Size) => {
  const sizes = {
    sm: 'w-10',
    md: 'w-20',
    lg: 'w-32',
  };
  return `relative h-2.5 web:h-3.5 rounded-sm bg-black50 overflow-hidden ${sizes[size]}`;
};

export default Skeletone;
