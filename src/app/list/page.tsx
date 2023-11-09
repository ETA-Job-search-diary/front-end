'use client';

import Icon from '@/assets/Icon';
import EmptyItem from '@/components/EmptyItem';
import FilterChips from '@/components/FilterChips';
import ScheduleList from '@/components/ScheduleList';
import ScheduleListHeader from '@/components/ScheduleListHeader';
import Button from '@/components/common/Button';

import { data2 } from '@/mock/data';
import { useState } from 'react';

export default function ListPage() {
  const total = data2.length;

  const [filter, setFilter] = useState<string[]>([]);

  const handleFilter = (value: string) => {
    const index = filter.indexOf(value);
    if (index === -1) {
      setFilter([...filter, value]);
    } else {
      const newFilter = [...filter];
      newFilter.splice(index, 1);
      setFilter(newFilter);
    }
    //TODO: Filter를 쿼리로 보내서 렌더링?
  };

  const [isEdit, setIsEdit] = useState(false); // isEdit 이면 ? 체크박스 보이게
  //** 체크 리스트  Reducer사용 (id 담아서, 전송하면 될듯?)
  const [checked, setChecked] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false); // 전체선택시, true로 변경

  const handleCheckItem = (id: string) => {
    const index = checked.indexOf(id);
    if (index === -1) {
      setChecked([...checked, id]);
    } else {
      const newChecked = [...checked];
      newChecked.splice(index, 1);
      setChecked(newChecked);
    }
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setChecked([]);
    } else {
      setChecked(data2.map((item) => item.id));
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleEditToggle = () => setIsEdit((prev) => !prev);

  return (
    <>
      <ScheduleListHeader
        count={total}
        isEdit={isEdit}
        onEditClick={handleEditToggle}
      />
      <section
        className={`px-[22px] web:px-[28px] flex flex-col gap-5 transition-all transform ${
          isEdit ? 'translate-y-[-8rem]' : 'translate-y-0 pb-20'
        }`}
      >
        <FilterChips isEdit={isEdit} checked={filter} onClick={handleFilter} />
        {isEdit && (
          <div className="flex justify-between items-end h-14">
            <div className="flex items-center gap-4 web:gap-3.5">
              <button type="button" onClick={handleCheckAll}>
                <Icon
                  name="check"
                  className={`w-3.5 h-3.5 web:w-5 web:h-5 ${
                    isAllChecked ? 'fill-primary500' : 'fill-black100'
                  }`}
                />
              </button>
              <span className="text-black900 text-sm web:text-md font-bold">
                전체 선택
              </span>
              {/* //TODO: 기획 - 있어도 좋지않을까..! <span className="text-black900 text-xs web:text-sm font-bold">
                {checked.length} 개
              </span> */}
            </div>
            <div className="flex gap-3">
              <Button size="xxs" label="전체삭제" color="border" />
              <Button size="xxs" label="선택삭제" color="border" />
            </div>
          </div>
        )}
        {
          <ScheduleList
            items={data2}
            isEdit={isEdit}
            checked={checked}
            onCheck={handleCheckItem}
          />
        }
        {!total &&
          (!!filter.length ? (
            <EmptyItem page="list" messageType="additional" />
          ) : (
            <EmptyItem page="list" messageType="empty" />
          ))}
      </section>
    </>
  );
}
