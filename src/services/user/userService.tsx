import React from 'react'
import { trackPromise } from 'react-promise-tracker';
import { AxiosResponse } from 'axios';
import api from '../../api/api';
import { IFormInputUser, User } from '../../types/Types';

const link ='users';

const userService = {
  getUserLogged: (): Promise<AxiosResponse> =>
  trackPromise(api.get(`${link}/me`)),

  getAllUser: (): Promise<AxiosResponse> =>
  trackPromise(api.get(`${link}`)),

  createUser: (dateUpdated: User): Promise<AxiosResponse> =>
    trackPromise(api.post(`${link}`, JSON.stringify({ ...dateUpdated }))),

  deleteUser: (idUser: number): Promise<AxiosResponse> =>
    trackPromise(api.delete(`${link}/${idUser}`)),

  updateUser: (idUser: number, user: IFormInputUser): Promise<AxiosResponse> =>
    trackPromise( api.put(`${link}/${idUser}`, JSON.stringify({ ...user })),
    ),

  getUserById: (idUser: number): Promise<AxiosResponse> =>
    trackPromise(api.get(`${link}/${idUser}`)),

};

export default userService;
