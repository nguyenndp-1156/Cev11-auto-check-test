import { ReactElement, useCallback } from 'react';

import {
  forwardRef,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  ResponsiveValue,
} from '@chakra-ui/react';

export type InputProps = Omit<ChakraInputProps, 'variant'> & {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  placeholder?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs' | ResponsiveValue<string>;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  type?: string;
  rightIcon?: ReactElement;
  showRightIcon?: boolean;
  isTrimSpace?: boolean;
};

const Input = forwardRef<InputProps, 'input'>(
  (
    {
      name = '',
      placeholder,
      size = 'md',
      variant,
      value,
      defaultValue,
      type = 'text',
      rightIcon,
      isTrimSpace = false,
      ...rest
    }: InputProps,
    ref,
  ) => {
    const handleTrimSpace = useCallback((event) => {
      const { value } = event.target;
      event.target.value = value.trim();
    }, []);

    return (
      <InputGroup {...rest}>
        <ChakraInput
          type="text"
          ref={ref}
          name={name}
          placeholder={placeholder}
          size={size}
          variant={variant}
          value={value}
          defaultValue={defaultValue}
          required={false}
          px="12px"
          style={{
            paddingRight: rightIcon || type === 'password' ? '55px' : '12px',
          }}
          _placeholder={{ color: 'gray.dark2' }}
          fontWeight="light"
          errorBorderColor="red.red1"
          color="black"
          {...rest}
          onBlur={isTrimSpace ? handleTrimSpace : () => null}
        />
      </InputGroup>
    );
  },
);

export default Input;
