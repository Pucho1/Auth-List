import Axios from 'axios';
import Cookies from 'js-cookie';
 
/* en esta pagina creo las configuraciones fijas de la coneccion a la api mediante axios */

const api = Axios.create({
  baseURL:'http://51.38.51.187:5050/api/v1/',
  // withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// getCookie('token') !== undefined
// getCookie('token') !== null
/* sessionStorage.getItem('tok') === null
    ? Axios.create({
        baseURL: process.env.REACT_APP_API,
        // withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    : Axios.create({
        baseURL: process.env.REACT_APP_API,
        // withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }); */

/* agrego al header el token de manera fija ante cada peticion */
// api.defaults.headers.Authorization = `Bearer ${getCookie())}`;

// api.interceptors.request.use(
//   (config) => {
//     const configActive = config;
//     const token = Cookies.get('token');
//     if (token) {
//       configActive.headers['X-AUTH-TOKEN'] = `${token}`;
//     } else if (!config.url.includes('token')) document.location.href = `/`;
//     return configActive;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

/* gestiono el uso del token segun necesito */
export const addToken = (token) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeBearerToken = () => {
  // api.defaults.withCredentials = false;
  delete api.defaults.headers.Authorization;
};

// revisar para que se hace esto
export const routes = {
  login: '/security/get/token',
  me: 'rest/get/config',
  access: `/rest/user/header/es/get/header`,
};

export const getCookies = () => {
  return Cookies;
};

export default api;
