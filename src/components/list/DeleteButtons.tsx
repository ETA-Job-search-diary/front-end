import Button from '../common/Button';

interface DeleteButtonsProps {
  onDeleteAll: () => void;
  onDelete: () => void;
}

const DeleteButtons = ({ onDeleteAll, onDelete }: DeleteButtonsProps) => {
  return (
    <div className="flex gap-3">
      <Button
        size="sm"
        label="전체삭제"
        variant="gray-border"
        onClick={onDeleteAll}
      />
      <Button
        size="sm"
        label="선택삭제"
        variant="gray-border"
        onClick={onDelete}
      />
    </div>
  );
};

export default DeleteButtons;
