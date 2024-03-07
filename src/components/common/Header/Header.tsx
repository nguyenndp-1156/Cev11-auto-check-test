import React from 'react';

import { Box, Flex, Image } from '@chakra-ui/react';

import * as S from './styled';

const Header = () => (
  <Box as="header" px="30px" pt="15px">
    <Flex
      position="relative"
      flexDirection="column"
      w="100px"
      alignItems="center"
    >
      <Box>
        <Image src="/images/logo.png" alt="logo" />
      </Box>
      <S.NameLogo>CEV11</S.NameLogo>
    </Flex>
  </Box>
);

export default Header;
