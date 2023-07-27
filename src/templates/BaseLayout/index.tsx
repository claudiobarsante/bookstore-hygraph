import React from 'react';
import { Container, Box } from '@mui/material';
// -- Custom components
import Appbar from 'components/Appbar';

export type BaseLayoutProps = {
  children: React.ReactNode;
};
const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Container maxWidth="xl" sx={{ border: '3px solid red' }}>
      <Appbar />
      {children}
    </Container>
  );
};

export default BaseLayout;
