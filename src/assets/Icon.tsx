import { SVGProps } from 'react';
import * as iconTypes from './svgs/index';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof iconTypes;
  fill?: string;
  className?: string;
}

const Icon = ({ name, fill, className, ...rest }: IconProps) => {
  const IconComponent = iconTypes[name];

  return <IconComponent fill={fill} className={className} {...rest} />;
};

export default Icon;
