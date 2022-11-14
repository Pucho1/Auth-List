import React, {useState, useEffect}  from 'react';
import userService  from '../services/user/userService';
import { AxiosResponse } from 'axios';

export const useGetAll =() =>{
    const [listUser, setListuser] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        userService.getAllUser()
        .then((listUser: AxiosResponse) => {
          if (listUser.status === 204) {
            setListuser(listUser.data.items);
            setIsLoading(false);
          } else {
            setListuser(listUser.data.items);
            setIsLoading(false);
          }
        })
        .catch((e: any) => {
          console.log('es del cath', e.message);
        });
        setIsLoading(false);
      }, []);

    console.log('estoy fuera del all');
    return {listUser, isLoading};
};
   