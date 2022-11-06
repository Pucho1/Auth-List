import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import userService from '../../services/user/userService';
import { AxiosResponse } from 'axios';
import TransitionsModal from '../../components/modal/ModalUI';
import FormsUpdate from '../../components/forms/FormsUpdate';
import Card from '../card/Card'

export default function BasicMenu(props: any) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isForm, setisForm] = useState<number>();
  // const [userId, setUserId] = useState<any>();
  // const [fila, setFila] = useState();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAll = () =>{
    userService.getAllUser()
    .then((listUser: AxiosResponse) => {
      if (listUser.status === 204) {
        // console.log('dentro del if', listUser.data.items.length);
        props.setuserList(listUser.data.items);
      } else {
        // console.log('este es malo arreglo vacio', listUser.data);
        props.setuserList(listUser.data.items);
        //setLoading(false);
      }
    })
    .catch((e: any) => {
      console.log('es del cath', e.message);
    });
  };

  const changeHandler = () => {
    setOpenForm(true);
    setAnchorEl(null);
    setisForm(1);
    console.log(props.row, props.index, 'estoy en el handler');
    // props.setUserId(props.row.id);
    // props.setFila(props.row);
  };
  const changeHandlerCard = () => {
    setOpenForm(true);
    setAnchorEl(null);
    setisForm(0);
    console.log(props.row, props.index, 'estoy en el handler');
    // props.setUserId(props.row.id);
    // props.setFila(props.row);
  };

  const deleteUser = (row: any) => {
    userService.deleteUser(row.id)
      .then((servidata: AxiosResponse) => {
        if (servidata.status === 204) {
            getAll();
            handleClose()
        } else {
          console.log('este es malo', servidata.data);
          //setLoading(true);
          
        }
      })
      .catch((e) => {
        alert(e);
        console.log('Compras', e);
        // setuserList(userList);
      });
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() =>{deleteUser(props.row)}}>
            Delete
        </MenuItem>

        <MenuItem onClick={changeHandler}>Update</MenuItem>

        <MenuItem onClick={changeHandlerCard}>user</MenuItem>
      </Menu>

      <TransitionsModal
        openForm={openForm}
        setOpenForm={setOpenForm}
        title={isForm === 1 ? 'Update' : null}
      >
        {isForm === 1 ? (
          <FormsUpdate
            setOpenForm={setOpenForm}
            buttonName='Udate'
            fila={props.row}
          />
        ) : (
          <Card user={props.row}/>
        )
        }
      </TransitionsModal>
    </div>
  );
}