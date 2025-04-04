import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Test: Add meta tag */}
          <meta name="author" content="JSTools Team" />
          <meta name="description" content="This is a test page for adding extra tags." />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-F8GPFH41SR"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-F8GPFH41SR');
              `,
            }}
          />

          {/* Test: Adding an external script */}
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"
          ></script>
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
