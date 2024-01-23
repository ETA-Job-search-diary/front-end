import { SVGProps } from 'react';
import * as iconTypes from './svgs/index';

export type IconTypes = keyof typeof iconTypes;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconTypes;
  className?: string;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const IconComponent = iconTypes[name];

  return <IconComponent className={className} {...props} />;
};

export default Icon;
