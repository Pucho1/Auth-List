import React, { useState } from 'react';
import { Container, Grid, FormControl, Box, Avatar } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';
import  AuthService  from '../services/AuthService';
import { addToken } from '../api/api';
import { useAuthStore } from '../store/AuthContext';
import { IFormInputUser, ResponseUserLogin } from '../types/Types';
import  { useNavigate }  from "react-router-dom";
import ing from '../images/gestion user.jpg';
import Notification from '../components/errores/Notification';
// import { addToken } from '../api/api';
// import Logout from './Logout/Logout';

export default function Auth(props: any) {

  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  const [msgError, setMsgError,] = useState('');
  const [status, setStatus] = useState('');
  const [openError, setOpenError] = useState(false);
  const navegate = useNavigate();
  const authStore = useAuthStore();


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
      navegate("/user");
    }, expirationTime * 10000);
  };

  // obtengo los datos enviados desde la base de datos ---token---
  // se tienen que enviar mas datos del usuario
  const onSubmit = (data: any) => {
    AuthService.login(data.email, data.password)
      .then((response: any) => {
        if (response.status === 200) {
          checkAuthTimeout(1000);
          authSuccess(response.data);
           console.log(response, 'no entro');
          setMsgError(response.message);
          setOpenError(true);
        } else {
          setMsgError(response.message);
          setOpenError(true);
          console.log(response, 'no entro');
        }
      })
      .catch((e: any) => {
          setMsgError(e.message);
          setOpenError(true);
      });
    };

  return (
    <Container fixed id="container-form">
      <Notification open={openError} setOpenError={setOpenError} msg={msgError}/>
      <Grid
        className="center generalGridAut"
        item
        container
        // spacing={2}
        rowSpacing={{xs: 4, md: 4, lg: 5}}
      >
        <Grid className="center boxAvatar" item xs={12}>
          <Avatar
            alt="Remy Sharp"
            src={ing}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid className="formGrid" item xs={12} margin='6px'>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
            <Grid container>
              <Grid className="gridFormControl center" item xs={12} margin='16px'>
                <FormControl className="formContrAuth" >
                  <Controller
                    //name="email"
                    control={control}
                      {...register("email", { 
                        required: "Email es requerido",
                        pattern: {
                          value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/,
                          message:"Direccion de email invalida"
                      }
                    })}
                        aria-invalid={errors.email ? "true" : "false"}
                    render={({ field }) => (
                      <TextField
                        { ...field}
                        name="email"
                        id="component-disabled"
                        label="Email"
                        size="small"
                        // required
                      />
                    )}
                  />
                  {errors.email && <p className="pError" role="alert">{errors.email?.message}</p>}
                </FormControl>
              </Grid >
              <Grid className="gridFormControl center" item xs={12} margin='16px'>
                <FormControl className="formContrAuth" >
                  <Controller
                    //name="password"
                    control={control}
                    {...register("password", {
                        required: "Password es requerida",
                        minLength: {
                          value: 5,
                          message: 'Password debería tener al menos 8 caracteres',
                        },
                        maxLength: {
                          value: 16,
                          message: 'Password debería tener  menos de 16 caracteres',
                        },
                      })}
                        aria-invalid={errors.password ? "true" : "false"}

                    render={({ field }) => (
                      <TextField
                        { ...field}
                        name="password"
                        type="password"
                        id="pas"
                        // required
                        label="Password"
                        size="small"

                      />
                    )}
                  />
                  {errors.password && <p className="pError" role="alert">{errors.password?.message}</p>}
                  <FormHelperText>{null}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item className='gridBtn center' xs={12} >
              <Button
                className="btnAuth"
                variant="contained"
                type="submit"
              >
                Sing Up
              </Button>
            </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
