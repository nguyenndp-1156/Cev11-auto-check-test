import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, Stack } from '@chakra-ui/react';

import Button from '@/components/atoms/Button';
import FieldItem from '@/components/atoms/FieldItem';
import Input from '@/components/atoms/Input';
import { DefaultLayout } from '@/components/templates/DefaultLayout';
import { NextPageWithLayout } from '@/types/layouts';
import { schema } from '@/utils/validations/pages/home';

const HomePage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ linkFile: string }>({
    defaultValues: {
      linkFile: '',
    },
    mode: 'all',
    resolver: zodResolver(schema),
  });
  const handleSubmitLinkFile = () => {};

  return (
    <Box as="section" w="100%" mt="40px">
      <Box
        background="white"
        p={{ sm: '10px 15px', md: '50px' }}
        borderRadius="10px"
        boxShadow="0 0 5px 0px rgba(140,134,134,0.75);"
        as="form"
        noValidate
        onSubmit={handleSubmit(handleSubmitLinkFile)}
      >
        <Stack gap="20px">
          <FieldItem
            label=" Please upload your estimation file"
            isRequired
            error={errors.linkFile?.message}
          >
            <Input
              fontSize="1.4rem"
              placeholder="Please input your link"
              {...register('linkFile')}
            />
          </FieldItem>

          <Button
            type="submit"
            variant="outline"
            w="285px"
            height="48px"
            mx="auto"
            fontSize="1.5rem"
            fontWeight="normal"
          >
            Upload File
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
