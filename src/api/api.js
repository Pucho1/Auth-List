import Axios from 'axios';
import Cookies from 'js-cookie';
 
const api = Axios.create({
  baseURL:'http://51.38.51.187:5050/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});


export const addToken = (token) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeBearerToken = () => {
  delete api.defaults.headers.Authorization;
};

export const routes = {
  login: '/security/get/token',
  me: 'rest/get/config',
  access: `/rest/user/header/es/get/header`,
};

export const getCookies = () => {
  return Cookies;
};

export default api;
