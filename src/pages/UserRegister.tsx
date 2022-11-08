import React, { useState } from 'react';
import { Grid, FormControl } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AuthService  from '../services/AuthService';
import { IFormInputUser } from '../types/Types';
import  { useNavigate }  from "react-router-dom";
import Notification from '../components/errores/Notification';

export default function UserRegister(props: any) {
  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  const [msgError, setMsgError] = useState('');
  const [openError, setOpenError] = useState(false);
  const [shooseMsg , setShooseMsg]= useState<boolean>();
  const navegate = useNavigate();

  const redirectDelay = (expirationTime: number) => {
    setTimeout(() => {
      navegate("/");
    }, expirationTime * 10000);
  };
  
  const onSubmit = async (data: any) => {
    AuthService.register(data)
      .then((res:any) => {
        if (res.data.code === 500) {
          setMsgError(`${res.data.message}`);
          setShooseMsg(false);
          setOpenError(true);
          return;
        }
          setShooseMsg(false);
          setOpenError(true)
          redirectDelay(1);
      })
      .catch((e:any) => {
        e.code === "ERR_NETWORK" ? setMsgError(e.message) : setMsgError(e.response.data.message);
        setShooseMsg(false);
        setOpenError(true);
      });
  };

  return (
      <Grid
        className='gridContRegis'
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <Notification open={openError} setOpenError={setOpenError} msg={msgError} shooseMsg={shooseMsg}/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid className="" container xs={12} rowSpacing={{xs: 4, md: 4, lg: 5}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid className="center" item xs={12}>
              <FormControl className="formCONT" sx={{ width: '40%' }} >
                <Controller
                  control={control}
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 16,
                      message: 'Password debería tener  menos de 16 caracteres',
                    },
                   })}
                      aria-invalid={errors.name ? "true" : "false"}
                  render={({ field }) => (
                    <TextField
                      className="textFieldRgs"
                      { ...field}
                      id="name-input"
                      size="small"
                      label="Name"
                      required
                    />
                  )}
                />
                {errors.name && <p className="pError" role="alert">{errors.name?.message}</p>}
              </FormControl>
            </Grid>
            <Grid className="center" item xs={12}>
              <FormControl className="formCONT" sx={{ width: '40%' }} >
                <Controller
                    control={control}
                    {...register("surname", {
                       required: "surname is required",
                       maxLength: {
                        value: 16,
                        message: 'Password debería tener  menos de 16 caracteres',
                      }, 
                      })} 
                        aria-invalid={errors.surname ? "true" : "false"}
                    render={({ field }) => (
                      <TextField
                        text-align="start"
                        { ...field}
                        id="surname-input"
                        size="small"
                        label="surname"
                        required
                      />
                    )}
                  />
                {errors.surname && <p className="pError" role="alert">{errors.surname?.message}</p>}

              </FormControl>
            </Grid>
            <Grid className="center" item xs={12} >
              <FormControl className="formCONT" sx={{ width: '40%' }}>
                <Controller
                  control={control}
                  {...register("password", {
                     required: "password is required",
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
                      className="textFieldRgs"
                      { ...field}
                      type="password"
                      id="password-input"
                      size="small"
                      label="Password"
                      required
                    />
                  )}
                />
                {errors.password && <p className="pError" role="alert">{errors.password?.message}</p>}
              </FormControl>
            </Grid>
            <Grid className="center" item xs={12} >
              <FormControl className="formCONT" sx={{ width: '40%' }}>
                <Controller
                  control={control}
                  {...register("email", {
                     required: "email is required",
                     pattern: {
                      value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/,
                      message:"invalid email addres"
                    }
                     })} 
                      aria-invalid={errors.email ? "true" : "false"}
                  render={({ field }) => (
                    <TextField
                      { ...field}
                      size="small"
                      id="email-input"
                      label="Email"
                      required
                    />
                  )}
                />
                {errors.email && <p className="pError" role="alert">{errors.email?.message}</p>}
              </FormControl>
            </Grid>

            <Grid className="center" item xs={6}  marginLeft='25%'>
              <Button
                martgin-top='35px'
                variant="contained"
                type="submit"
                className="btnAuth"
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
  );
}
