import React, { useState } from 'react';
import { Container, Grid, FormControl } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
// import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import { AxiosResponse } from 'axios';
import { Button } from '@mui/material';
import UserService  from '../../services/user/userService';
import { IFormInputUser } from '../../types/Types';
// import { User } from '../../types/Types';
import '../../styles/update.css';

export default function FormsUpdate(props: any) {
  const { fila, isToCreate, buttonName } = props;
  const { handleSubmit, register, control, formState: { errors }} = useForm<IFormInputUser>();
  // const [msgError, setMsgError] = useState('');
  // const [validated, setValidated] = useState(false);

    const onSubmit = (data: IFormInputUser) => {
      UserService.updateUser(fila.id, data)
        .then((res:AxiosResponse) => {
        if (res.data.code === 200) {
            // props.setServicios(res.data.data);
            props.setOpen(false);
            // <Alert>su producto se agrego correctatmente</Alert>;
        } else {
            props.setErrorMio(res.data.message);
            alert(props.errorMio);
            // props.setServicios(props.listservicio);
            // props.setLoading(false);
            // props.setModalShow(false);
          }
        })
          .catch((e: any) => {
          //console.log(e);
          props.setLoading(false);
          });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid xs={12}>
          <FormControl sx={{ width: '25ch', margin: '20px 0px' }} >
            <InputLabel htmlFor="component-error">Name</InputLabel>
            <Controller
              control={control}
              {...register("name")} 
                  aria-invalid={errors.name ? "true" : "false"}
              render={({ field }) => (
              <Input
                defaultValue={fila.name}
                { ...field}
                id="name-input"
                // required
                // defaultValue="Hello World"
              />
              )}
            />
            {errors.name && <p role="alert">{errors.name?.message}</p>}
          </FormControl>
          <FormControl sx={{ width: '25ch', margin: '20px 0px' }} >
            <InputLabel htmlFor="component-error">surname</InputLabel>
              <Controller
                control={control}
                {...register("surname")} 
                    aria-invalid={errors.surname ? "true" : "false"}
                render={({ field }) => (
                <Input
                  { ...field}
                  defaultValue={fila.surname}
                  name="surname"
                  id="surname-input"
                  // required
                />
                )}
              />
              {errors.surname && <p role="alert">{errors.surname?.message}</p>}
          </FormControl>
          <FormControl sx={{ width: '25ch', margin: '20px 0px' }}>
            <InputLabel htmlFor="component-disabled">Password</InputLabel>
            <Controller
                control={control}
                {...register("password")} 
                    aria-invalid={errors.password ? "true" : "false"}
                render={({ field }) => (
                <Input
                    { ...field}
                    type="password"
                    id="password-input"
                    // required
                    defaultValue={fila.name}
                />
                )}
            />
            {errors.password && <p role="alert">{errors.password?.message}</p>}
            </FormControl>
          <FormControl sx={{ width: '25ch', margin: '20px 0px' }}>
            <InputLabel htmlFor="component-disabled">Email</InputLabel>
            <Controller
                control={control}
                {...register("email")} 
                    aria-invalid={errors.email ? "true" : "false"}
                render={({ field }) => (
                <Input
                    { ...field}
                    id="email-input"
                    // required
                    defaultValue={fila.email}
                />
                )}
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
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
    </form>
  );
};
