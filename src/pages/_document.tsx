import { Global } from '@emotion/react';
import { Html, Head, Main, NextScript } from 'next/document';
import globalStyle from '@/styles/global';

export default function Document() {
  return (
    <Html>
      <Head>
        <Global styles={globalStyle} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
