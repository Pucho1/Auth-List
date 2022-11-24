import React, { useState } from 'react';
import { Container, Grid, FormControl, Avatar } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';
import  AuthService  from '../services/AuthService';
import { addToken } from '../api/api';
import { useAuthStore } from '../store/AuthContext';
import { IFormInputUser, ResponseUserLogin } from '../types/Types';
import  { useNavigate }  from "react-router-dom";
import ing from '../images/users.jpg';
import Notification from '../components/errores/Notification';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';

export default function Auth(props: any) {

  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  const [msgError, setMsgError,] = useState('');
  const [openError, setOpenError] = useState(false);
  const [pass, setPass] = useState<boolean>(false);

  const navegate = useNavigate();
  const authStore = useAuthStore();

  const authSuccess = (dataUser: ResponseUserLogin) => {
    authStore.setToken(dataUser.accessToken);
    sessionStorage.setItem('accessToken', dataUser.accessToken);
    addToken(dataUser.accessToken);
    navegate("/user");
  };

  const checkAuthTimeout = (expirationTime: number) => {
    console.log('estoy llamaando al deslogueo');
    setTimeout(() => {
      navegate("/user");
    }, expirationTime * 10000);
  };

  const onSubmit = (data: any) => {
    AuthService.login(data.email, data.password)
      .then((response: any) => {
        if (response.status === 200) {
          checkAuthTimeout(1000);
          authSuccess(response.data);
        } else {
          setMsgError(response.message);
          setOpenError(true);
        }
      })
      .catch((e: any) => {
        e.code === "ERR_NETWORK" ? setMsgError(e.message) : setMsgError(e.response.data.message);
        setOpenError(true);
      });
    };
  const handleClickShowPassword = () => {
    setPass(!pass);
  };
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container fixed id="container-form">
      <Notification open={openError} setOpenError={setOpenError} msg={msgError}/>
      <Grid
        className="center generalGridAut"
        item
        container
        rowSpacing={{xs: 4, md: 4, lg: 5}}
      >
        <Grid className="center boxAvatar" item xs={12}>
          <Avatar
            alt="Remy Sharp"
            src={ing}
            sx={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid className="formGrid" item xs={12} margin='6px'>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
            <Grid container>
              <Grid className="gridFormControl center" item xs={12} margin='16px'>
                <FormControl className="formContrAuth" >
                  <Controller
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
                      />
                    )}
                  />
                  {errors.email && <p className="pError" role="alert">{errors.email?.message}</p>}
                </FormControl>
              </Grid >
              <Grid className="gridFormControl center" item xs={12} margin='16px'>
                <FormControl className="formContrAuth" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ top:"-20%"}}>Password</InputLabel>
                  <Controller
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
                      <OutlinedInput
                        { ...field}
                        name="password"
                        type={pass ? "text" : "password" }
                        id="pas"
                        label="Password"
                        size="small"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {pass ? <Visibility />  : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }

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
