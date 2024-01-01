import Icon from '@/assets/Icon';
import { memo } from 'react';
import Button from '../common/Button';
import { AbsStatus } from './FilterList';

interface EditButtonsProps {
  currentOrder: AbsStatus;
  isEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCompleted: () => void;
  onOrder: (abs: AbsStatus) => void;
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
          <div className="flex gap-3">
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => onOrder('newest')}
            >
              <Icon
                name="ellipse"
                className={`${
                  currentOrder === 'newest'
                    ? 'fill-primary-500'
                    : 'fill-black-300'
                }`}
              />
              <span
                className={`${
                  currentOrder === 'newest'
                    ? 'text-primary-500'
                    : 'text-black-300'
                } text-0.85 font-medium`}
              >
                최신순
              </span>
            </button>
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => onOrder('created')}
            >
              <Icon
                name="ellipse"
                className={`${
                  currentOrder === 'created'
                    ? 'fill-primary-500'
                    : 'fill-black-300'
                }`}
              />
              <span
                className={`${
                  currentOrder === 'created'
                    ? 'text-primary-500'
                    : 'text-black-300'
                } text-0.85 font-medium`}
              >
                등록순
              </span>
            </button>
          </div>
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

export default memo(EditButtons);
