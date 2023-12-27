import { memo } from 'react';
import Button from '../common/Button';

interface EditButtonsProps {
  isEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCompleted: () => void;
}
//TODO: 일정 추가 할지 기획논의 필요
const EditButtons = ({
  isEdit,
  onEdit,
  onDelete,
  onCompleted,
}: EditButtonsProps) => {
  return (
    <div className="flex items-center justify-between">
      {isEdit ? (
        <>
          <Button
            label="삭제"
            variant="gray-border"
            width="max"
            onClick={onDelete}
          />
          <Button
            label="완료"
            variant="primary-border"
            width="max"
            onClick={onCompleted}
          />
        </>
      ) : (
        <>
          <Button
            label="편집"
            variant="gray-border"
            width="max"
            onClick={onEdit}
          />
        </>
      )}
    </div>
  );
};

export default memo(EditButtons);
