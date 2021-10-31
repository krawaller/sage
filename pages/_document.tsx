import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/ui.css" />
          <link rel="stylesheet" href="/fonts/fonts.css" />
          <meta property="og:site_name" content="Presentation OMG" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
