import type { ThemeOverride } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import breakpoints from './breakpoints';
import colors from './colors';
import components from './components';
import global from './global';

const theme: ThemeOverride = extendTheme({
  colors,
  components,
  breakpoints,
  ...global,
});

export default theme;
