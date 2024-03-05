import { ReactNode } from 'react';

import { Button as BaseButton, ButtonProps, Spinner } from '@chakra-ui/react';

type Props = Omit<ButtonProps, 'variant'> & {
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'solid' | 'outline' | 'ghost' | 'link';
  colorScheme?: string;
  isSubmitting?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  colorScheme = 'black',
  isSubmitting = false,
  ...rest
}: Props) => (
  <BaseButton
    variant={variant}
    colorScheme={colorScheme}
    isDisabled={isSubmitting || rest.isDisabled}
    leftIcon={
      isSubmitting ? (
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="white"
          color="gray.light11"
          size="md"
        />
      ) : (
        <div style={{ width: 0, height: 0, display: 'none' }}></div>
      )
    }
    iconSpacing={isSubmitting ? '5px' : 0}
    {...rest}
  >
    {children}
  </BaseButton>
);

export default Button;
