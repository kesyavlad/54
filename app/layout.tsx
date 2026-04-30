import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const volja = localFont({
  src: [
    { path: './fonts/Volja-Black.ttf',   weight: '900', style: 'normal' },
    { path: './fonts/Volja-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-volja',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "54 ОАБр — Вступай до лав",
  description: "54-та Окрема Артилерійська Бригада ЗСУ — Vis et Victoria.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={volja.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600&family=Russo+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
