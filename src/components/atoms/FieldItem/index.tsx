import React, { ReactNode } from 'react';

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';

type TFieldProps = Omit<FormControlProps, 'variant'> & {
  labelColor?: string;
  labelSize?: object;
  children: ReactNode;
  error?: string;
  isHideErrorMessage?: boolean;
};

const FieldItem = ({
  label,
  children,
  labelColor = 'black',
  error,
  isHideErrorMessage = false,
  ...rest
}: TFieldProps) => {
  return (
    <FormControl isInvalid={!!error} {...rest}>
      {label && (
        <FormLabel
          mb="4px"
          color={labelColor}
          fontSize="1.6rem"
          fontWeight="bold"
          requiredIndicator={
            <Text as="span" color="red.red1" ml="4px" fontSize="1.6rem">
              *
            </Text>
          }
        >
          {label}
        </FormLabel>
      )}
      {children}
      {error && !isHideErrorMessage && (
        <FormErrorMessage mt="4px">
          <Text
            fontSize="1.3rem"
            color="red.red1"
            ml="4px"
            mt="2px"
            flex="1"
            textAlign="left"
          >
            {error}
          </Text>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FieldItem;
