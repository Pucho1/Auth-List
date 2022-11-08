import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import AlertTitle from '@mui/material/AlertTitle';

const HandleError = (props: any) => {
  const {open= false, msgError='algo paso'} = props;

    return (

      <Stack className="boxStackAler" sx={{ width: '100%' }} spacing={2}>
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    props.setOpenError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle className="headerAlert">Error</AlertTitle>
              {msgError}
            </Alert>
          </Collapse>
        </Box>
      </Stack>
    )
}

export default HandleError;
