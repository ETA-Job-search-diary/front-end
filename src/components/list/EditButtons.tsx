import Button from '../common/Button';
import { SortTypes } from './FilterList';
import SortButtons from './SortButtons';

interface EditButtonsProps {
  currentOrder: SortTypes;
  isEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCompleted: () => void;
  onOrder: (abs: SortTypes) => void;
}

const EditButtons = ({
  currentOrder,
  isEdit,
  onEdit,
  onDelete,
  onCompleted,
  onOrder,
}: EditButtonsProps) => {
  return (
    <div className="flex items-center justify-between">
      {isEdit ? (
        <>
          <Button
            size="sm"
            label="삭제"
            width="max"
            variant="gray-border"
            onClick={onDelete}
          />
          <Button
            size="sm"
            label="완료"
            width="max"
            variant="primary-border"
            onClick={onCompleted}
          />
        </>
      ) : (
        <>
          <SortButtons current={currentOrder} onSort={onOrder} />
          <Button
            size="sm"
            label="편집"
            width="max"
            variant="gray-border"
            onClick={onEdit}
          />
        </>
      )}
    </div>
  );
};

export default EditButtons;
