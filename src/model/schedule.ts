export interface ScheduleDetailType {
  id: string;
  step: string;
  company: string;
  position: string;
  date: string;
  link?: string;
  platform?: string;
  memo?: string;
}

export type ScheduleStatus = 'pending' | 'pass' | 'fail';

export interface ScheduleSimpleType {
  id: string;
  step: string;
  company: string;
  position: string;
  date: string;
  status: ScheduleStatus;
}

export interface ScheduleFilterType {
  value: string;
}

export interface WeeklyScheduleType {
  thisWeek: ScheduleDetailType[];
  nextWeek: ScheduleDetailType[];
}
