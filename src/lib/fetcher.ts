import { api } from '@/service/api';
import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const fetchWithToken = (url: string, token: string) => {
  return api(url, 'get', token);
};