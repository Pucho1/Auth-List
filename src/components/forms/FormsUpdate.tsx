import React, { useState } from 'react';
import { Container, Grid, FormControl, Alert } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import { AxiosResponse } from 'axios';
import { Button } from '@mui/material';
import UserService  from '../../services/user/userService';
import TextField from '@mui/material/TextField';
import { IFormInputUser } from '../../types/Types';

export default function FormsUpdate(props: any) {
  const { fila, isToCreate, buttonName } = props;
  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  // const [msgError, setMsgError] = useState('');
  // const [validated, setValidated] = useState(false);

  const onSubmit = (data: IFormInputUser) => {
    UserService.updateUser(fila.id, data)
      .then((res:AxiosResponse) => {
      if (res.status === 200) {
          console.log('estoy e el envio del update ntes del open');
          props.setOpenForm(false);
          console.log('estoy e el envio del update');
          props.getAll();
      } else {
          props.setErrorMio(res.data.message);
          alert(props.errorMio);
        }
      })
        .catch((e: any) => {
          props.setLoading(false);
        });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container >
          <Grid item xs={12}>
            <FormControl sx={{ width: '25ch', margin: '20px 0px' }} >
              <Controller
                control={control}
                {...register("name", {
                  maxLength: {
                    value: 16,
                    message: 'El nombre debería tener  menos de 16 caracteres',
                  }
                })}
                    aria-invalid={errors.name ? "true" : "false"}
                render={({ field }) => (
                <TextField
                  defaultValue={fila.name}
                  { ...field}
                  id="name-input"
                  label="Name"
                  size="small"
                />
                )}
              />
              {errors.name && <p className="pError" role="alert">{errors.name?.message}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '25ch', margin: '20px 0px' }} >
                <Controller
                  control={control}
                  {...register("surname", {
                    maxLength: {
                      value: 16,
                      message: 'El surname debería tener  menos de 16 caracteres',
                    }
                  })} 
                      aria-invalid={errors.surname ? "true" : "false"}
                  render={({ field }) => (
                  <TextField
                    { ...field}
                    defaultValue={fila.surname}
                    name="surname"
                    label="surname"
                    id="surname-input"
                    size="small"
                    // required
                  />
                  )}
                />
                {errors.surname && <p className="pError" role="alert">{errors.surname?.message}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '25ch', margin: '20px 0px' }}>
                <Controller
                    control={control}
                    {...register("password", {
                      pattern: {
                        value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/,
                        message:"Direccion de email invalida"
                    }
                    })} 
                        aria-invalid={errors.password ? "true" : "false"}
                    render={({ field }) => (
                    <TextField
                        { ...field}
                        type="password"
                        id="password-input"
                        // required
                        defaultValue={fila.name}
                        label="Password"
                        size="small"

                    />
                    )}
                />
                {errors.password && <p className="pError" role="alert">{errors.password?.message}</p>}
                </FormControl>
          </Grid>
            
          <Grid item xs={12}>
            <FormControl sx={{ width: '25ch', margin: '20px 0px' }}>
              <Controller
                  control={control}
                  {...register("email")} 
                      aria-invalid={errors.email ? "true" : "false"}
                  render={({ field }) => (
                  <TextField
                      { ...field}
                      id="email-input"
                      // required
                      defaultValue={fila.email}
                      label="Email"
                      size="small"
                  />
                  )}
              />
              {errors.email && <p className="pError" role="alert">{errors.email?.message}</p>}
            </FormControl>
          </Grid>
          <Grid marginLeft='35%' className="gridBtnUdate">
            <Button
              martgin-top='35px'
              variant="contained"
              type="submit"
            >
              { buttonName }
            </Button>
          </Grid>
        </Grid>
    </form>
  );
};
