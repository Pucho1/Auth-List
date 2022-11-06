import React  from 'react';
import Cookies from 'js-cookie';
import { useAuthStore } from '../store/AuthContext';
import { removeBearerToken } from '../api/api';
import  { useNavigate }  from "react-router-dom";

export const useLogout =() =>{
    const authStore = useAuthStore();
    const history = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        sessionStorage.removeItem('userData');
        Cookies.remove('token');
        authStore.setToken('');
        authStore.clerarUser();
        sessionStorage.removeItem('tok');
        removeBearerToken();
        history('/');
    }

    return {logout}
};
   