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
            color="gray-border"
            width="max"
            onClick={onDelete}
          />
          <Button
            label="완료"
            color="primary-border"
            active
            width="max"
            onClick={onCompleted}
          />
        </>
      ) : (
        <>
          <Button
            label="편집"
            color="gray-border"
            width="max"
            onClick={onEdit}
          />
          <Button
            label="+ 일정등록"
            active
            width="max"
            color="primary-border"
            // onClick={onAdd}
          />
        </>
      )}
    </div>
  );
};

export default memo(EditButtons);
