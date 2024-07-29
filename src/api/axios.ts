import axios from 'axios';
import { store } from '../redux';
import { ShowAlert } from 'src/providers/toast';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  timeout: 10000, //10s api call before ending
  headers: {},
});

Axios.interceptors.request.use(function (config: any) {
  // console.log('Axios api just called ---', config.url);
  const token = store.getState().user?.token;
  config.headers.Authorization = token ? `${token}` : '';
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      ShowAlert({ type: 'error', message: error.response.data.message });
    }

    return error.response.data
  },
);

const { get, post, put, delete: destroy } = Axios;
export { get, post, put, destroy };
