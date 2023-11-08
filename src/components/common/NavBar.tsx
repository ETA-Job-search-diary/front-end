import { ReactNode } from 'react';

interface NavBarProps {
  label?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const NavBar = ({ label, leftSection, rightSection }: NavBarProps) => {
  return (
    <nav className="w-full text-black900 h-16 web:h-[70px] grid grid-cols-[auto_1fr_auto] place-items-center text-sm web:text-md">
      <p className="col-start-1">{leftSection}</p>
      <p className="col-start-2 font-semibold">{label}</p>
      <p className="col-start-3">{rightSection}</p>
    </nav>
  );
};

export default NavBar;
