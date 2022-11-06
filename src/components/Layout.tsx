import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Container } from "@mui/material";

type Props = {
  children: JSX.Element,
};
const Layout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Container >
        {children}
      </Container>
      {/*location.pathname === '/registrar' ||
      location.pathname === '/recuperar_contraseña' ||
      location.pathname === '/auth' ? (
        ''
      ) : (
        <Footer />
      )*/}
    </>
  );
};

export default Layout;