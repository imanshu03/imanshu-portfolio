import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="px-0 md:px-[6rem] lg:px-[10rem] xl:px-[15rem] box-border bg-gray-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
