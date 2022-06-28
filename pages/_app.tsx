import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>imanshu rathore&apos;s</title>
        <meta name="description" content="imanshu rathore's portfolio" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="imanshu rathore's portfolio"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Imanshu Rathore's Portfolio"
          key="og:description"
        />
        <link rel="icon" href="/coding.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
