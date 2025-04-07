import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to domains you'll fetch from */}
        <link rel="preconnect" href="https://imagedelivery.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&display=swap"
          rel="stylesheet"
        />
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/favicon.ico?v=2"
          as="image"
          type="image/x-icon"
        />
        <link
          rel="preload"
          as="image"
          href="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/22218a4e-1efb-43dd-ff1e-562588e15a00/hd1920x1080"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
