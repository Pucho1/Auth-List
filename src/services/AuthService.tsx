import { trackPromise } from 'react-promise-tracker';
import { AxiosResponse } from 'axios';
import api from '../api/api';
import { User } from '../types/Types';


const AuthService = {
  //login: (name: string, surname:string, email:string, password: string): Promise<AxiosResponse> =>
  login: ( email:string, password: string): Promise<AxiosResponse> =>
  trackPromise(
    api.post(`auth/log-in`, JSON.stringify({ password, email })),
  ),
  register: (user: User): Promise<AxiosResponse> =>
    trackPromise(api.post(`auth/sign-up`, JSON.stringify({ ...user }))),
};

export default AuthService;