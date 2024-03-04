import { Box, Container } from '@chakra-ui/react';
import React, { ReactElement, ReactNode } from 'react';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

type Props = {
  children: ReactNode;
};

export function DefaultLayout(props: Props) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" pt="50px">
      <Header />
      <Container
        maxW="container.xl"
        flex="1"
        px="24px"
        pb={{ sm: '32px', md: '56px' }}
        flexDirection="column"
        display="flex"
      >
        {props?.children}
      </Container>
      <Footer />
    </Box>
  );
}

export function getDefaultLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
}
