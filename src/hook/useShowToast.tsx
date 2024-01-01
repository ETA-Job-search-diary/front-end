import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useCallback } from 'react';

export const TOAST_MESSAGE = {
  TOKEN: {
    title: '로그인이 만료되었어요. 다시 로그인해주세요.',
  },
  DELETE: {
    title: '등록된 일정이 삭제되었어요.',
  },
  WITHDRAW: {
    title: '탈퇴기능은 준비중입니다.',
    description: '죄송합니다. 🚪',
  },
  PASSING_RATE: {
    title: '입력완료! MY페이지에서 합격률을 확인해보세요',
  },
  ERROR_HOME: {
    title: '에러가 발생했어요. 홈화면으로 돌아갈게요.',
  },
};

const useShowToast = () => {
  const { push } = useRouter();
  const { toast } = useToast();

  const showTokenExpirationToast = useCallback(
    () => toast(TOAST_MESSAGE.TOKEN),
    [],
  );

  const showDeleteConfirmToast = useCallback(
    () => toast(TOAST_MESSAGE.DELETE),
    [],
  );

  const showWithdrawalToast = useCallback(
    () => toast(TOAST_MESSAGE.WITHDRAW),
    [],
  );

  const showPassingRateToast = useCallback(
    () => toast(TOAST_MESSAGE.PASSING_RATE),
    [],
  );

  const showErrorHomeToast = useCallback(
    () =>
      toast({
        title: TOAST_MESSAGE.ERROR_HOME.title,
        action: (
          <ToastAction onClick={() => push('/')} altText="홈">
            홈으로
          </ToastAction>
        ),
      }),
    [],
  );

  return {
    showTokenExpirationToast,
    showDeleteConfirmToast,
    showWithdrawalToast,
    showPassingRateToast,
    showErrorHomeToast,
  };
};

export default useShowToast;
