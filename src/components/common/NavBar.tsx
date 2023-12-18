import { ReactNode, memo } from 'react';

interface NavBarProps {
  label?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const NavBar = ({ label, leftSection, rightSection }: NavBarProps) => {
  return (
    <nav className="text-1.1 grid h-16 w-full grid-cols-[1fr_5fr_1fr] place-items-stretch items-center justify-center px-1 text-black900 web:h-[70px]">
      <p className="col-start-1">{leftSection}</p>
      <p className="col-start-2 text-center font-semibold">{label}</p>
      <p className="col-start-3 text-center">{rightSection}</p>
    </nav>
  );
};

export default memo(NavBar);
