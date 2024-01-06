import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = 'get' | 'post' | 'delete' | 'put';
export const api = async (
  url: string,
  method: Method,
  token?: string,
  data?: any,
) => {
  const response = await axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.data;
};
