import {
  forwardRef,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';

export type SelectOptionValue = {
  label: string | number;
  value: number | string | undefined;
};

export type SelectProps = Omit<ChakraSelectProps, 'variant'> & {
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  name?: string;
  options?: SelectOptionValue[];
  placeholder?: string;
  errorMessage?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  isDisabled?: boolean;
  emptyOption?: boolean;
  disabledTranslate?: boolean;
};

const Select = forwardRef<SelectProps, 'input'>(
  (
    {
      name = '',
      options,
      placeholder = '',
      size = 'md',
      value,
      variant = 'outline',
      isDisabled = false,
      emptyOption = true,
      disabledTranslate = false,
      ...rest
    }: SelectProps,
    ref,
  ) => {
    return (
      <ChakraSelect
        name={name}
        size={size}
        variant={variant}
        isDisabled={isDisabled}
        value={value}
        required={false}
        placeholder={placeholder}
        color="black"
        ref={ref}
        {...rest}
      >
        {emptyOption && (
          <option value="" style={{ fontSize: '14px', fontWeight: '300' }} />
        )}
        {options?.map(({ label, value }, index) => (
          <option
            value={value}
            key={index}
            style={{ fontSize: '14px', color: 'black', fontWeight: '300' }}
            {...(disabledTranslate ? { 'data-stt-ignore': true } : {})}
          >
            {label}
          </option>
        ))}
      </ChakraSelect>
    );
  },
);

export default Select;
