const MESSAGE_TYPES = {
  title: {
    coming: '다가오는 일정이 없어요',
    past: '지난 일정이 없어요',
    category: '해당 카테고리에 등록된 일정이 없어요',
  },
  suggestion: {
    add: '등록 버튼을 클릭해서\n새로운 일정을 등록해 보세요!',
    find: '다른 일정을 찾아보세요!',
  },
};

export const SCHEDULE_MESSAGE = {
  coming: {
    title: MESSAGE_TYPES.title.coming,
    suggestion: MESSAGE_TYPES.suggestion.add,
  },
  past: {
    title: MESSAGE_TYPES.title.past,
    suggestion: MESSAGE_TYPES.suggestion.find,
  },
  category: {
    title: MESSAGE_TYPES.title.category,
    suggestion: MESSAGE_TYPES.suggestion.add,
  },
};
