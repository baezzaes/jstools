import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ 스크립트 컴포넌트 추가
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSTools",
  description: "작지만 유용한 웹도구 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="F8GPFH41SR" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ 구글 애널리틱스 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F8GPFH41SR"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F8GPFH41SR');
          `}
        </Script>

        {/* ✅ 네이버 애널리틱스 */}
        <Script
          src="//wcs.naver.net/wcslog.js"
          strategy="afterInteractive"
        />
        <Script
          id="naver-analytics"
          strategy="afterInteractive"
        >
          {`
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "d4097fa6b14190";
            if(window.wcs) {
              wcs_do();
            }
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
