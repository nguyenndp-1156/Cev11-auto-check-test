import type { ChakraTheme, ComponentStyleConfig } from '@chakra-ui/react';

const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'light',
    fontSize: 'sm',
    borderRadius: '24px',
    _focus: {
      opacity: 0.8,
    },
  },

  variants: {
    primary: {
      bg: 'black',
      borderColor: 'black',
      color: 'white',
      _hover: {
        opacity: 0.8,
      },
      _disabled: {
        opacity: 0.15,
        _hover: {
          bg: 'black !important',
          opacity: 0.15,
        },
      },
    },

    dark: {
      bg: 'gray.dark9',
      color: 'white',
      _hover: {
        opacity: 0.8,
      },
      _disabled: {
        opacity: 0.15,
        _hover: {
          opacity: 0.15,
          bg: 'gray.dark9 !important',
        },
      },
    },

    secondary: {
      bg: 'secondary',
      color: 'white',
      _hover: {
        opacity: 0.8,
      },
      _disabled: {
        _hover: {
          bg: 'secondary !important',
        },
      },
    },

    outline: {
      bg: 'white',
      borderColor: 'black',
      color: 'black',
      _active: {
        bg: 'white',
      },
      _hover: {
        opacity: 0.8,
        bg: 'white !important',
      },
      _disabled: {
        opacity: 0.15,
        _hover: {
          bg: 'white !important',
          opacity: 0.15,
        },
      },
    },

    defaultProps: {
      variant: 'primary',
    },
  },

  sizes: {
    lg: {
      height: '48px',
      fontSize: 'sm',
      padding: '12px 16px',
    },

    md: {
      height: '32px',
      fontSize: 'sm',
    },
  },
};

const InputStyle: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        borderRadius: '4px',
        borderColor: 'gray.dark2',
        _placeholder: { fontSize: 'sm', color: 'gray.dark2' },
        _focus: {
          ring: 1,
          ringColor: 'gray.dark2',
          borderColor: 'gray.dark2',
        },
        _hover: {
          borderColor: 'gray.dark2',
        },
      },
    },
  },

  sizes: {
    md: {
      field: {
        borderRadius: 'md',
        height: '4rem',
        fontSize: '1.4rem',
      },
    },
    lg: {
      field: {
        borderRadius: 'md',
        height: '4.8rem',
        fontSize: '1.4rem',
      },
    },
  },
};

const SelectStyle: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        borderRadius: '4px',
        borderColor: 'gray.dark2',

        _focus: {
          ring: 1,
          ringColor: 'gray.500',
          borderColor: 'gray.600',
        },
        _hover: {
          borderColor: 'gray.600',
        },
      },
    },
  },
  sizes: {
    md: {
      field: {
        fontSize: '1.4rem',
        borderRadius: '4px',
        height: '40px',
        padding: '0 24px 0 12px',
      },
    },
  },
};

const components: ChakraTheme['components'] = {
  Button: ButtonStyle,
  Input: InputStyle,

  Select: SelectStyle,
};

export default components;
