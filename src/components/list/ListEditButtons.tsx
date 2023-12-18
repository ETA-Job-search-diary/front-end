import Button from '../common/Button';

interface ListEditButtonsProps {
  isEdit: boolean;
  onEditClick: () => void;
  onEditComplete: () => void;
}

const ListEditButtons = ({
  isEdit,
  onEditClick,
  onEditComplete,
}: ListEditButtonsProps) => {
  return (
    <>
      {isEdit ? (
        <Button
          label="완료"
          width="max"
          color="primary-border"
          onClick={onEditComplete}
        />
      ) : (
        <Button
          label="편집"
          width="max"
          color="primary-border"
          onClick={onEditClick}
        />
      )}
    </>
  );
};

export default ListEditButtons;
