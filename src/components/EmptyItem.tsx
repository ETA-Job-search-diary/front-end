import Icon from '@/assets/Icon';

const EmptyItem = () => {
  return (
    <li className="py-3 web:h-[200px] flex flex-col justify-center items-center gap-1 border border-black100 text-black200 rounded-large">
      <Icon name="defaultCharacter" className="w-4 h-4 web:w-6 web:h-6" />
      <h3 className="text-xs web:text-sm font-bold">등록된 일정이 없어요</h3>
      <p className="text-xxs web:text-xs text-center">
        추가 버튼을 눌러
        <br />
        새로운 일정을 등록해보세요!
      </p>
    </li>
  );
};

export default EmptyItem;
