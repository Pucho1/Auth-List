import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Container, Grid, FormControl } from "@mui/material";
import { Navigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';
import  AuthService  from '../services/AuthService';
import { addToken } from '../api/api';
import { useAuthStore } from '../store/AuthContext';
import { IFormInputUser, ResponseUserLogin } from '../types/Types';
import  { useNavigate }  from "react-router-dom";
import HandleError from '../components/errores/HandleError';
import '../styles/auth.css';

// import { addToken } from '../api/api';
// import Logout from './Logout/Logout';

export default function Auth(props: any) {

  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  const [msgError, setMsgError,] = useState('');
  const [status, setStatus] = useState('');
  const [openError, setOpenError] = useState(false);
  const navegate = useNavigate();
  const authStore = useAuthStore();
  // const password = useRef({});
  // password.current = watch('password', '');

  // envio datos para su verificacion
  const authSuccess = (dataUser: ResponseUserLogin) => {
    authStore.setToken(dataUser.accessToken);
    sessionStorage.setItem('accessToken', dataUser.accessToken);
    // authStore.setUserReg(dataUser);
    addToken(dataUser.accessToken);
    navegate("/user");
    // muestro la pagina si es admin
    /*if (dataUser.user.permission.find((x) => x === 1)) {
      props.history.push('/dashboard');
    } else if (localStorage.getItem('lastPath')) {
      props.history.push(localStorage.getItem('/admin/usuarios'));
    } else {

    }*/
    //return history("/user");
  };
  // limpio todos los datos de la seccion y el user

  // manejo los tiempos para el deslogueo obligatorio
  const checkAuthTimeout = (expirationTime: number) => {
    console.log('estoy llamaando al deslogueo');
    setTimeout(() => {
      props.history.push('/logout');
    }, expirationTime * 10000);
  };

  // obtengo los datos enviados desde la base de datos ---token---
  // se tienen que enviar mas datos del usuario
  const onSubmit = (data: any) => {
    AuthService.login(data.email, data.password)
      .then((response: any) => {
        if (response.status === 200) {
          // almaceno el token en la seccion
          checkAuthTimeout(1000);
          authSuccess(response.data);
          setMsgError(response.message);
          setOpenError(true);
        } else {
          setMsgError(response.message);
          setOpenError(true);
          console.log(response, 'no entro');
        }
      })
      .catch((e: any) => {
          setOpenError(true);
          setMsgError(e.message);
      });
    };

    console.log(msgError, 'este es el error de la llamada');
  
  return (
    <Container fixed id="container-register" sx={{ minHeight: "100vh"}}>
      <HandleError open={openError} setOpenError={setOpenError} msgError={msgError}/>
      <Grid
        display='flex'
        sx={{minHeight:'100vh'}}
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} margin='50px'>
              <FormControl className="formContrAuth" sx={{ width: '25ch' }}>
                <InputLabel htmlFor="component-disabled">Email</InputLabel>
                <Controller
                  //name="email"
                  control={control}
                  {...register("email", { required: "Email Address is required" })} 
                      aria-invalid={errors.email ? "true" : "false"}
                  render={({ field }) => (
                    <Input
                      { ...field}
                      name="email"
                      id="component-disabled"
                      // required
                    />
                  )}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
              </FormControl>
            </Grid >
            <Grid item xs={12} margin='35px'>
              <FormControl className="formContrAuth" sx={{ width: '25ch' }}>
                <InputLabel htmlFor="component-disabled">Password</InputLabel>
                <Controller
                  //name="password"
                  control={control}
                  {...register("password", { required: "Password is required" })} 
                      aria-invalid={errors.password ? "true" : "false"}

                  render={({ field }) => (
                    <Input
                      { ...field}
                      name="password"
                      type="password"
                      id="pas"
                      // required
                    />
                  )}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
                <FormHelperText>{null}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item className='gridBtn' xs={12} >
            <Button
              variant="contained"
              type="submit"
            >
              Autentiquese
            </Button>
          </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
