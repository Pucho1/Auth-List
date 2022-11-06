import React, { useState } from 'react';
import { Container, Grid, FormControl } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';
import AuthService  from '../services/AuthService';
import { IFormInputUser } from '../types/Types';
import '../styles/register.css';

export default function UserRegister(props: any) {
  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  const [msgError, setMsgError] = useState('');
/*const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IFormInputs>({ mode: 'onChange' });*/
  
  //const [msgSuccess, setMsgSuccess] = useState('');
  //const password = useRef({});
  // password.current = watch('password', '');

  const onSubmit = async (data: any) => {
    AuthService.register(data)
      .then((res:any) => {
        if (res.data.code === 500) {
          setMsgError(`${res.data.message}`);
          //setMsgSuccess('');
          return;
        }
        //setMsgSuccess('Se ha creado la cuenta correctamente active su cuenta');
        setMsgError('');

        props.history.push('/confirmar');
      })
      .catch((e:any) => {
        //setMsgSuccess('');
        setMsgError(e.response.data.message);
      });
  };
  console.log('el error es ',msgError);
  
  return (
      <Grid
        className='gridContRegis'
        display='flex'
        sx={{minHeight:'100vh'}}
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container xs={12} rowSpacing={{xs: 4, md: 4, lg: 5}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <FormControl className="formCONT" sx={{ width: '40%', textAlign: 'end' }} >
                <Controller
                  control={control}
                  {...register("name", { required: "Name is required" })} 
                      aria-invalid={errors.name ? "true" : "false"}
                  render={({ field }) => (
                    <TextField
                      className="textFieldRgs"
                      { ...field}
                      id="name-input"
                      // required
                      //size="small"
                      label="Name"
                      variant="standard"
                      required
                    />
                  )}
                />
                {errors.name && <p role="alert">{errors.name?.message}</p>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="formCONT" sx={{ width: '40%' }} >
                <Controller
                    control={control}
                    {...register("surname", { required: "surname is required" })} 
                        aria-invalid={errors.surname ? "true" : "false"}
                    render={({ field }) => (
                      <TextField
                        text-align="start"
                        { ...field}
                        id="surname-input"
                        // required
                        label="surname"
                        variant="standard"
                        required
                      />
                    )}
                  />
                {errors.surname && <p role="alert">{errors.surname?.message}</p>}

              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className="formCONT" sx={{ width: '40%' }}>
                <Controller
                  control={control}
                  {...register("password", { required: "password is required" })} 
                      aria-invalid={errors.password ? "true" : "false"}
                  render={({ field }) => (
                    <TextField
                      className="textFieldRgs"
                      { ...field}
                      type="password"
                      id="password-input"
                      label="Password"
                      variant="standard"
                      required
                      // required
                    />
                  )}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className="formCONT" sx={{ width: '40%' }}>
                <Controller
                  control={control}
                  {...register("email", { required: "email is required" })} 
                      aria-invalid={errors.email ? "true" : "false"}
                  render={({ field }) => (
                    <TextField
                      { ...field}
                      id="email-input"
                      label="Email"
                      variant="standard"
                      required
                    />
                  )}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
              </FormControl>
            </Grid>
            
            <Grid item xs={6}  marginLeft='25%'>
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