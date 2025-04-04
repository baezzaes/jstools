// pages/_app.tsx
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

declare global {
  interface Window {
    gtag: (command: string, config: string) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-F8GPFH41SR');
    }
  }, [])

  return (
    <>
      <Head>
        {/* 구글 애널리틱스 코드 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F8GPFH41SR"
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F8GPFH41SR');
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
