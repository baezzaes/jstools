import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google 사이트 소유권 확인 메타 태그 */}
          <meta name="google-site-verification" content="U4d1DaTsfSAS7FfdfRbatn8szv1ujLZPXeoZZ43mLYI" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
