import { CompleteFormType } from '@/model/schedule';
import { api } from './api';

export const getScheduleBy = async (id: string, token: string) => {
  return api(`/schedules/detail/${id}`, 'get', token);
};

export const postSchedule = async (data: CompleteFormType, token: string) => {
  return api(`/schedules`, 'post', token, data);
};

export const deleteSchedule = async (id: string, token: string) => {
  return api(`/schedules/${id}`, 'delete', token);
};
