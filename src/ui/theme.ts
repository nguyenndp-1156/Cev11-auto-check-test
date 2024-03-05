import type { ThemeOverride } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import breakpoints from './breakpoints';
import colors from './colors';
import components from './components';
import fonts from './fonts';
import fontWeights from './fontWeights';
import global from './global';

const theme: ThemeOverride = extendTheme({
  colors,
  components,
  breakpoints,
  fontWeights,
  fonts,
  ...global,
});

export default theme;
