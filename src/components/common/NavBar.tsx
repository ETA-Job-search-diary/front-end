import { ReactNode } from 'react';

interface NavBarProps {
  label?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const NavBar = ({ label, leftSection, rightSection }: NavBarProps) => {
  return (
    <nav className="w-full text-black900 h-16 web:h-[70px] grid grid-cols-[1fr_5fr_1fr] place-items-center text-sm web:text-md">
      <p className="col-start-1 px-[20px]">{leftSection}</p>
      <p className="col-start-2 font-semibold">{label}</p>
      <p className="col-start-3 px-[20px]">{rightSection}</p>
    </nav>
  );
};

export default NavBar;
