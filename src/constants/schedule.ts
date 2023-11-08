export type PageType = 'home' | 'list';
export type ScheduleMessageType = 'empty' | 'additional';

type ScheduleItem = {
  content: string;
  suggestion: string;
  suggestAlt?: string;
};

export type ScheduleType = Record<
  PageType,
  Record<ScheduleMessageType, ScheduleItem>
>;

export const SCHEDULE_MESSAGE: ScheduleType = {
  home: {
    empty: {
      content: '등록된 일정이 없어요', // 유저가 등록한 일정이 아예 없을때 0일때!
      suggestion: '추가 버튼을 눌러',
      suggestAlt: '새로운 일정을 등록해보세요!',
    },
    additional: {
      content: '다가오는 일정이 없어요', // 일정은 있는데 이번주, 다음주에만 없을 때
      suggestion: '추가 버튼을 눌러',
      suggestAlt: '새로운 일정을 등록해보세요!',
    },
  },
  list: {
    empty: {
      content: '등록된 일정이 없어요', // 유저가 등록한 일정이 아예 없을 때
      suggestion: '새로운 일정을 등록해보면 어떨까요?',
    },
    additional: {
      // 있는데 해당 카테고리에는 없을 때
      content: '해당 카테고리에 등록된 일정이 없어요',
      suggestion: '다른 일정을 찾아보면 어떨까요?',
    },
  },
};
