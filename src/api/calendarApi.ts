import axios, { AxiosRequestHeaders } from 'axios';

type CalendarRequestHeaders = {
  'x-token': string;
} & AxiosRequestHeaders;

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

calendarApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')!
  } as CalendarRequestHeaders;
  return config;
})

export default calendarApi;
