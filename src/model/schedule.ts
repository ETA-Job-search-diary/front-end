export interface ScheduleDetailType {
  id: string;
  title: string;
  step: StepType;
  user: string;
  company: string;
  position: string;
  date: string;
  link?: string;
  platform?: string;
  memo?: string;
}

export interface StepType {
  id: string;
  name: string; // 한글이름
  value: string;
}
