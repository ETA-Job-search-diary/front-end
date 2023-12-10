export interface ScheduleDetailType {
  id: string;
  step: string;
  user?: string;
  company: string;
  position: string;
  date: string;
  link?: string;
  platform?: string;
  memo?: string;
}

export interface ScheduleSimpleType {
  id: string;
  step: string;
  company: string;
  position: string;
  date: string;
}

export interface ScheduleFilterType {
  value: string;
}

export interface WeeklyScheduleType {
  thisWeek: ScheduleDetailType[];
  nextWeek: ScheduleDetailType[];
}
