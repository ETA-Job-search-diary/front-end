import { memo } from 'react';
import Button from './common/Button';

interface EditButtonProps {
  isEdit: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
}

const EditButton = ({
  isEdit,
  onEdit,
  onDelete,
  onConfirm,
}: EditButtonProps) => {
  return (
    <div className="flex gap-3">
      {isEdit ? (
        <>
          <Button
            size="xxs"
            label="선택삭제"
            color="border"
            onClick={onDelete}
          />
          <Button size="xxs" label="완료" color="border" onClick={onConfirm} />
        </>
      ) : (
        <Button size="xxs" label="편집" color="border" onClick={onEdit} />
      )}
    </div>
  );
};

export default memo(EditButton);
