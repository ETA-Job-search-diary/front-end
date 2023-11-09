import { ReactNode } from 'react';

interface NavBarProps {
  label?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const NavBar = ({ label, leftSection, rightSection }: NavBarProps) => {
  return (
    <nav className="w-full text-black900 h-16 web:h-[70px] grid grid-cols-[1fr_5fr_1fr] place-items-stretch justify-center items-center text-sm web:text-md px-1">
      <p className="col-start-1">{leftSection}</p>
      <p className="col-start-2 font-semibold text-center">{label}</p>
      <p className="col-start-3">{rightSection}</p>
    </nav>
  );
};

export default NavBar;
