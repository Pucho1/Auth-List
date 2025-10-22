import React from 'react'; 
import DTableComponent from '../../components/tables/DTableComponent';
import { Grid } from "@mui/material";

const UserManage = () =>{
  return (
      <Grid
        container
        justifyContent='center'
        display='block'
      >
        <h1 style={{ textAlign: 'center' }}>Gestion de usuarios</h1>
        <DTableComponent />
      </Grid>
    );
};

export default UserManage;

