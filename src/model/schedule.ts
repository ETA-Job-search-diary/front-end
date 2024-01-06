export type StepTypes =
  | 'document'
  | 'assignment'
  | 'written'
  | 'personality'
  | 'first'
  | 'second'
  | 'final'
  | 'etc';

export interface EssentialFormType {
  step: StepTypes;
  company: string;
  position: string;
  date: string;
}

export interface CompleteFormType extends EssentialFormType {
  link?: string;
  platform?: string;
  memo?: string;
}

export type ScheduleStatusType = 'pending' | 'pass' | 'fail';

export interface ScheduleDetailType extends CompleteFormType {
  id: string;
  status: ScheduleStatusType;
}

export interface EditScheduleType {
  step?: StepTypes;
  company?: string;
  position?: string;
  date?: string;
  link?: string;
  platform?: string;
  memo?: string;
  status?: ScheduleStatusType;
}
