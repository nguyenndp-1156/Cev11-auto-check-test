import type { ThemeOverride } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import global from './global';

const theme: ThemeOverride = extendTheme({
  ...global,
});

export default theme;
