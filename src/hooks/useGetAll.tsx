import React, {useState}  from 'react';
import UserService  from '../services/user/userService';
import { AxiosResponse } from 'axios';
import { IFormInputUser, User } from '../types/Types';
import { devolucion } from '../types/Types';

export const useGetAll =() =>{

    const [ressult, setResult]= useState<any>();

    const all = (): devolucion => {
        let user: any;
        let error: string ;
        let msg: string ;

        UserService.getAllUser()
        .then((res:AxiosResponse) => {
        if (res.status === 200) {
            setResult({ ...ressult, [user]: res.data.items});
            console.log(ressult, 'estoy en el all')
            setResult({ ...ressult, [msg]: 'tod estuvo bien'});
        } else {
            setResult({ ...ressult, [error]: res.data.message});
            }
        })
        .catch((e: any) => {
            setResult({ ...ressult, [error]: e.data.message});
        });
        return ressult;
    };

    console.log(ressult);
    return {all};
};
   