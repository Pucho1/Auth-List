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
  const [useReg, setUserReg] = useState<ResponseUserLogin>(defaultContextValue); // le paso el valor arriba linea 12
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // const [access, setAccess] = useState<Array<Access>>(new Array<Access>());
 
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
    console.log(sessionStorage.getItem('accessToken'), 'token session isadmin');
    console.log(tokenotro, 'token tokenotro isadmin');
    /*if (token !== null) {
      setIsAdmin(useReg.user.permission.find((x) => x === 1) !== undefined);
      console.log(
        'es',
        useReg.user.permission.find((x) => x === 1),
      );
    } else {
      setIsAdmin(false);
    }*/
    setIsAuthenticated(token !== null || tokenotro !== '');
  }, [useReg]);


  /*useEffect(() => {
    const token = getCookies().get('token');
    console.log(token);
    if (token !== undefined) {
      window.history.replaceState(null, '', window.location.pathname);
      const dataUser =
        JSON.parse(sessionStorage.getItem('userData') as string) || null;

      if (dataUser !== null) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define,no-use-before-define
        // getAccessMenu(dataUser.userLogin.userrol);
        setUserReg(dataUser);
      }
      // else {
      // updateUser(token);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useReg]);*/

  const setToken = async (accessToken: string) => {
    const now = new Date();
    const minutos = 12 * 60;
    now.setTime(now.getTime() + minutos);
    document.cookie = `token=${accessToken}; expires=${now.toUTCString()};path=/;`;
    console.log('en la cookies tengo el token',document.cookie);
    await setUserReg({ ...useReg, accessToken });
  };

  const clerarUser = () => {
    console.log('estoy en clear');
    setUserReg(defaultContextValue);
    console.log('pase el default');
    // setIsAdmin(false);
    setIsAuthenticated(false);
    console.log('pase el set');
  };

  /*const getAccessMenu = (rol: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const route = require('../i18n/router/access.json');
    // eslint-disable-next-line no-console
    // console.log('route', user.userLogin, route, rol);
    const routerFinal = new Array<Access>();
    route.access.forEach((obj: Access) => {
      const links = obj.links.filter((o: { role: string[] }) =>
        o.role.includes(rol.toUpperCase()),
      );
      if (links.length > 0) {
        routerFinal.push({ ...obj, links });
      }
    });
    // eslint-disable-next-line no-console
    // console.log(routerFinal);
    setAccess(routerFinal);
  };
*/
  const valueContext: any = {
    useReg,
    clerarUser,
    setUserReg,
    setToken,
    isAuthenticated,
   // access,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export function useAuthStore(): any {
  return useContext(AuthContext);
}
