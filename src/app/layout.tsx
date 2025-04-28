import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";

import "./globals.scss";

const redHatDisplaySans = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const metadata: Metadata = {
  title: "Next.js Markdown Blog Starter",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${redHatDisplaySans.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
