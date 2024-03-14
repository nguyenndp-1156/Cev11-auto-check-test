import React, { ReactElement, ReactNode } from 'react';

import { Box, Container } from '@chakra-ui/react';

import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';

type Props = {
  children: ReactNode;
};

export function DefaultLayout(props: Props) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container
        maxW="800px"
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
