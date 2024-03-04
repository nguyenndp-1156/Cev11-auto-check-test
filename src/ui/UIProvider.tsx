import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

type ProviderProps = {
  children: React.ReactNode;
};

export function UIProviders({ children }: ProviderProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
