import { ReactNode } from 'react';

interface DetaillayoutProps {
  children: ReactNode;
}

const Detaillayout = ({ children }: DetaillayoutProps) => {
  return (
    <div className="min-h-screen web:min-h-full w-full bg-white">
      {children}
    </div>
  );
};

export default Detaillayout;
