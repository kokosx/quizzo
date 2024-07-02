import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzo",
  description: "Check your knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="coffee" lang="en">
      <body
        className={`${inter.className} container mx-auto flex justify-center items-center min-h-screen h-full`}
      >
        {children}
      </body>
    </html>
  );
}
