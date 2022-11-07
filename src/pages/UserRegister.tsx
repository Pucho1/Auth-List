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

  const redirecDelay = (expirationTime: number) => {
    console.log('estoy llamaando al redirect');
    setTimeout(() => {
      navegate("/");
    }, expirationTime * 10000);
  };
  
  const onSubmit = async (data: any) => {
    AuthService.register(data)
      .then((res:any) => {
        if (res.data.code === 500) {
          setMsgError(`${res.data.message}`);
          console.log('el error es ',res.data.message);
          setShooseMsg(false);
          setOpenError(true);
          return;
        }
          setShooseMsg(false);
          setOpenError(true)
          redirecDelay(10);
      })
      .catch((e:any) => {
          setMsgError(e.message);
          setShooseMsg(true);
          setOpenError(true);
      });
  };
  console.log('el error es ',msgError);



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
          <Grid container xs={12} rowSpacing={{xs: 4, md: 4, lg: 5}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid className="center" item xs={12}>
              <FormControl className="formCONT" sx={{ width: '40%', textAlign: 'end' }} >
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
                      //variant="standard"
                      required
                    />
                  )}
                />
                {errors.name && <p role="alert">{errors.name?.message}</p>}
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
                        // variant="standard"
                        required
                      />
                    )}
                  />
                {errors.surname && <p role="alert">{errors.surname?.message}</p>}

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
                {errors.password && <p role="alert">{errors.password?.message}</p>}
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
                {errors.email && <p role="alert">{errors.email?.message}</p>}
              </FormControl>
            </Grid>
            
            <Grid className="center" item xs={6}  marginLeft='25%'>
              <Button
                martgin-top='35px'
                variant="contained"
                type="submit"
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
  );
}