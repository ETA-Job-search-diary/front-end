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
            size="xs"
            label="삭제"
            active={false}
            color="secondary"
            onClick={onDelete}
          />
          <Button
            size="xs"
            label="완료"
            active
            color="secondary"
            onClick={onCompleted}
          />
        </>
      ) : (
        <>
          <Button
            size="xs"
            label="편집"
            active={false}
            color="secondary"
            onClick={onEdit}
          />
          <Button
            size="xs"
            label="+ 일정등록"
            active
            color="secondary"
            // onClick={onAdd}
          />
        </>
      )}
    </div>
  );
};

export default memo(EditButtons);
