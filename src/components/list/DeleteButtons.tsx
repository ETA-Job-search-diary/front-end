import Button from '../common/Button';

interface DeleteButtonsProps {
  onDeleteAll: () => void;
  onDelete: () => void;
}

const DeleteButtons = ({ onDeleteAll, onDelete }: DeleteButtonsProps) => {
  return (
    <div className="flex gap-3">
      <Button
        size="xxs"
        label="전체삭제"
        color="border"
        active
        onClick={onDeleteAll}
      />
      <Button size="xxs" label="선택삭제" color="border" onClick={onDelete} />
    </div>
  );
};

export default DeleteButtons;
