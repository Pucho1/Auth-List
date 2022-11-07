import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  { useNavigate }  from "react-router-dom";

export default function Nonitification(props: any) {
  const{msg, open, shooseMsg= true}= props;
  const navegate = useNavigate();

  const handleClose = () => {
    shooseMsg && navegate('/');
    props.setOpenError(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {shooseMsg ? "!!!!!!Oh something went wrong¡¡¡¡¡" : "!!Its doed¡¡"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {shooseMsg ? msg : "!!Se ha registrado correctamente¡¡"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}