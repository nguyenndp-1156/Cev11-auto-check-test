import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '@/stores/store';
import { Provider } from 'react-redux';
import { UIProviders } from '@/ui/UIProvider';
import { NextPageWithLayout } from '@/types/layouts';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
  ...rest
}: AppPropsWithLayout) {
  const { store } = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout;

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
        {getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}
      </UIProviders>
    </Provider>
  );
}
