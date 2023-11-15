import { BASE_URL } from '@/constants/service';
import axios from 'axios';

export const getScheduleBy = async (id: string, token: string) => {
  return axios
    .get(`${BASE_URL}/schedules/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

interface ScheduleDataType {
  title: string;
  step: string;
  company: string;
  position: string;
  date: string;
  link?: string;
  platform: string | null;
  memo?: string;
}

export const postSchedule = async (data: ScheduleDataType, token: string) => {
  return axios
    .post(`${BASE_URL}/schedules`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const deleteSchedule = async (id: string, token: string) => {
  return axios
    .delete(`${BASE_URL}/schedules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const putSchedule = async (
  id: string,
  data: ScheduleDataType,
  token: string,
) => {
  return axios
    .put(`${BASE_URL}/schedules/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
