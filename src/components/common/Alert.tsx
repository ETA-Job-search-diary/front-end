import { createPortal } from 'react-dom';
import Button from './Button';

export enum AlertType {
  cancel = '취소',
  delete = '삭제',
  login = '로그인이 필요해요',
  confirm = '확인',
}

interface AlertProps {
  message: string;
  type: {
    value: AlertType;
    onClick: () => void;
  }[];
}

const Alert = ({ message, type }: AlertProps) => {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed z-30 w-full h-full top-0 flex justify-center items-center bg-alert">
      <section className="bg-white rounded-medium text-black800 flex flex-col justify-center items-center px-5 py-4 w-[269px] web:w-[320px] h-40 web:h-[190px] shadow-md">
        <div className="grow flex justify-center items-center web:text-md">
          {message}
        </div>
        <div className="w-full flex justify-between gap-1">
          {type.map(({ value, onClick }, index) => (
            <>
              <Button
                key={value}
                color={
                  type.length === 1
                    ? 'primary'
                    : index === 0
                    ? 'secondary'
                    : 'primary'
                }
                label={value}
                active
                size="sm"
                onClick={onClick}
              />
            </>
          ))}
        </div>
      </section>
    </div>,
    document.getElementById('root')?.querySelector('main') || document.body,
  );
};

export default Alert;
