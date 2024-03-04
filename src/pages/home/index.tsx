import { DefaultLayout } from '@/components/templates/DefaultLayout';
import { NextPageWithLayout } from '@/types/layouts';
import { Text } from '@chakra-ui/react';
import React from 'react';

const HomePage: NextPageWithLayout = () => {
  return <Text color="red">Home Page</Text>;
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
