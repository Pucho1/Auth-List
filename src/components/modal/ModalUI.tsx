import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props: any) {
  const { 
    children,
    title,
    openForm,
    isForm
  } = props;
  const handleClose = () => props.setOpenForm(false);
  // console.log(openForm,'demtro el modal');
  return (
    <div>
      <Modal
        className="modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openForm}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openForm}>
          <Box className={isForm === 1 ? "boxModalUpdate" :"boxModalCard"} sx={style}>
            <div className="header_modal">
              <Typography className="titleModal" id="transition-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
            </div>
            <div className="body_modal">
              {children}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}