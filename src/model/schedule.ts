export interface ScheduleDetailType {
  id: string;
  title: string;
  step: string;
  user: string;
  company: string;
  position: string;
  date: string;
  link?: string;
  platform?: string;
  memo?: string;
}

export interface ScheduleSimpleType {
  id: string;
  title: string;
  step: string;
  company: string;
  position: string;
  date: string;
}

export interface ScheduleFilterType {
  value: string;
}
