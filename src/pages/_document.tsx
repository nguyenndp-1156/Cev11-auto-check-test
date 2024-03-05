import { Head, Html, Main, NextScript } from 'next/document';
import { Global } from '@emotion/react';

import globalStyle from '@/styles/global';

export default function Document() {
  return (
    <Html>
      <Head>
        <Global styles={globalStyle} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Rock+3D&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
