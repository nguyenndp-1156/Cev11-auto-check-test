import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/stores/store';
import { NextPageWithLayout } from '@/types/layouts';
import { UIProviders } from '@/ui/UIProvider';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
  ...rest
}: AppPropsWithLayout) {
  const { store } = wrapper.useWrappedStore(rest);
  const [isClient, setIsClient] = useState(false);

  const page = (Component.getLayout ?? ((page) => page))(
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#fff" />
      </Head>

      <Component {...pageProps} />
    </>,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      <UIProviders>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <meta name="theme-color" content="#fff" />
        </Head>
        {isClient ? page : null}
      </UIProviders>
    </Provider>
  );
}
