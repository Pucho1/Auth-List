import React from 'react';
import Header from './Header';
import { Container } from "@mui/material";

type Props = {
  children: JSX.Element,
};
const Layout = ({ children }: Props) => {

  return (
    <>
      <Header />
      <Container className="containerBody">
        estees el children
        {children}
      </Container>
    </>
  );
};

export default Layout;