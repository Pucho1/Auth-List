import React from 'react';
import Container from '@mui/material/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/header.css'
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuthStore } from '../store/AuthContext';
import { Logout } from '@mui/icons-material';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const authStore = useAuthStore();
  const {logout} = useLogout();
  
   return (
    <Container className="cantainer_head">
      <Navbar>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="" >
            <Stack direction="row" spacing={2}>
              <Button className="boton_header" variant="outlined" >
                <Link className="link_header" to="/register">register</Link>
              </Button>
              <Button className="boton_header" variant="outlined" >
                <Link to="/">auth</Link>
              </Button>
              { authStore.isAuthenticated ? (
                <>
                  <Button className="boton_header" variant="outlined" >
                    <Link to="/user">user</Link>
                  </Button>
                  <Button className="boton_header" variant="outlined" onClick={logout}>
                    <Logout />
                  </Button>
                </>
                ) : null
              }
            </Stack>
          </Nav>
        </ Navbar.Collapse>
      </Navbar>
    </Container>
  )
};

export default Header;
