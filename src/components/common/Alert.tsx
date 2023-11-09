import { createPortal } from 'react-dom';
import Button from './Button';
import useDisableBodyScroll from '@/hook/useDisableBodyScroll';

export enum AlertType {
  cancel = '취소',
  delete = '삭제',
  login = '로그인이 필요해요',
  confirm = '확인',
  edit = '수정',
}

interface AlertProps {
  message: string;
  type: {
    value: AlertType;
    onClick: () => void;
  }[];
  onClose: () => void;
}
//TODO: 모달 팝업 애니메이션 추가
const Alert = ({ message, type, onClose }: AlertProps) => {
  if (typeof window === 'undefined') return null;

  useDisableBodyScroll();

  return createPortal(
    <div
      className={`fixed z-30 top-0 min-h-screen mx-auto min-w-[280px] w-full max-w-[500px] flex justify-center items-center bg-alert`}
      onClick={onClose}
    >
      <section
        className={`bg-white rounded-medium text-black800 flex flex-col justify-center items-center px-5 py-4 w-[269px] web:w-[320px] h-40 web:h-[190px] shadow-md`}
      >
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
    document.body.querySelector('main') || document.body,
  );
};

export default Alert;
