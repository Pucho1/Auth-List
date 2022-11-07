import React, { createContext, useState, useContext, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ResponseUserLogin } from '../types/Types'; //Access,
import { getCookies } from '../api/api';

type Props = {
  children: React.ReactElement;
};
// le digo que es de tipo repuesta de user logueado
export const defaultContextValue: ResponseUserLogin = {
  accessToken: '',
};

export const AuthContext = createContext<ResponseUserLogin>(
  defaultContextValue as ResponseUserLogin,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [useReg, setUserReg] = useState<ResponseUserLogin>(defaultContextValue);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

 function getCookie(cname: string) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }


  /* aqui reviso la seguridad para validar la existencia de un token
    si el token no tiene valor ni pregunto peo si tiene valor pregunto si es admin 
    en este caso si el acceso vale 1 
  */
  useEffect(() => {
    const tokenotro = getCookie('token');
    const token = sessionStorage.getItem('accessToken');
    console.log(sessionStorage.getItem('accessToken'), 'token de session storage');
    console.log(tokenotro, 'token token de las cookies');
      if(token !== null && tokenotro !== ''){
        setIsAuthenticated(true);
        return;
      } else setIsAuthenticated(false);
  }, [useReg]);


  const setToken = async (accessToken: string) => {
    const now = new Date();
    const minutos = 12 * 60;
    now.setTime(now.getTime() + minutos);
    document.cookie = `token=${accessToken}; expires=${now.toUTCString()};path=/;`;
    console.log('en la cookies tengo el token',document.cookie);
    await setUserReg({ ...useReg, accessToken });
  };

  const clerarUser = () => {
    setUserReg(defaultContextValue);
    setIsAuthenticated(false);
  };


  const valueContext: any = {
    useReg,
    clerarUser,
    setUserReg,
    setToken,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export function useAuthStore(): any {
  return useContext(AuthContext);
}
