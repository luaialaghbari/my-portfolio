import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#0b0b0f" />
        <link rel="icon" href={`${basePath}/assets/logopic.png`} />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
