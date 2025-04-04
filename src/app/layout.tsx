import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        {/* 기본 메타 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="F8GPFH41SR" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F8GPFH41SR"></script>
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

        {/* Naver Analytics */}
        <script type="text/javascript" src="//wcs.naver.net/wcslog.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "d4097fa6b14190";
              if (window.wcs) {
                wcs_do();
              }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
