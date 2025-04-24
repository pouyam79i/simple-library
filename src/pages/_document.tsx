import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // TODO: implement for ltr ?
    <Html suppressHydrationWarning dir="rtl">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
