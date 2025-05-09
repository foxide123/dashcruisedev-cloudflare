import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="alternate" href="/en" hrefLang="en" />
        <link rel="alternate" href="/de" hrefLang="de" />
        {/* Preconnect to domains you'll fetch from */}
        <link rel="preconnect" href="https://imagedelivery.net" />
       {/*
        We use next/font/google instead
        
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
        /> */}
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/favicon.ico"
          as="image"
          type="image/x-icon"
        />
        <link
          rel="preload"
          as="image"
          href="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/22218a4e-1efb-43dd-ff1e-562588e15a00/hd1920x1080"
        />
        <link
          rel="preload"
          as="image"
          href="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/c0d6674f-31fc-4fc3-cdcd-7cd049c48700/logo240x240"
        />

        <link
          rel="preload"
          as="image"
          href="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/8b797d3f-6998-43c5-8c6e-ab7d5165b700/logo240x240"
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
