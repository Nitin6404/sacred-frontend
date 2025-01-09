import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/layout/providers";
import Head from "next/head";
import { TawkToWidget } from "@/components/tawk.to";
import { GoogleTagManager } from "@next/third-parties/google";

const font = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Sacred Shaadi",
  description: "One stop solution for all your wedding needs",
  icons: "/favicon.png"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={"GTM-K5MNQ742"} />
      <Head>
        <meta name="google-site-verification" content="oZg_Uh-QP5zqnHG4-yH-CPsQfb8mnhNakZlHDewYEgs" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.maateen.me/bangla/font.css" rel="stylesheet" />
        <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet" />
        <link href="https://fonts.maateen.me/kalpurush/font.css" rel="stylesheet" />
        <link href="https://fonts.maateen.me/siyam-rupali/font.css" rel="stylesheet" />
        <link href="https://fonts.maateen.me/adorsho-lipi/font.css" rel="stylesheet" />
        <link href="https://fonts.maateen.me/mukti/font.css" rel="stylesheet" />
        <style>
          {`
            @font-face {
              font-family: 'Nikosh';
              src: url('/fonts/Nikosh.ttf') format('truetype');
            }
            @font-face {
              font-family: 'Akaash';
              src: url('/fonts/Akaash.ttf') format('truetype');
            }
            @font-face {
              font-family: 'Shonar Bangla';
              src: url('/fonts/Shonar Bangla.ttf') format('truetype');
            }
          `}
        </style>
      </Head>

      <body className={cn(font.className, "min-h-screen overflow-auto")}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5MNQ742"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextTopLoader showSpinner={false} color="#E11D48" />
        <Providers>
          {children}
          <Toaster />
          <TawkToWidget />
        </Providers>
      </body>
    </html>
  );
}
