import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safebusiness.services"),
  title: "Safe Business Services | Разработка сайтов для бизнеса",
  description:
    "Разработка лендингов, корпоративных сайтов и интернет-магазинов для бизнеса.",
  keywords: [
    "разработка сайтов",
    "лендинг",
    "корпоративный сайт",
    "интернет-магазин",
    "Safe Business Services",
  ],
  openGraph: {
    title: "Safe Business Services | Сайты, которые продают",
    description:
      "Упакуем вашу идею в современный сайт, который вызывает доверие и приводит заявки.",
    type: "website",
    locale: "ru_RU",
    siteName: "Safe Business Services",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark scroll-smooth">
      <body className={`${inter.variable} bg-background font-sans text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
