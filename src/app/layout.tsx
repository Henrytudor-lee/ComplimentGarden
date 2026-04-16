import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import { inject } from "@vercel/analytics";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

inject();

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compliment Garden / 赞美花园 - Transform Photos into Poetic Masterpieces",
  description:
    "Upload a photo and receive AI-generated, heartfelt praise in various literary styles. The digital keepsake for cherished moments.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="/fonts/material-symbols.css"
        />
      </head>
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
