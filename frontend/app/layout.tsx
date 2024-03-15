import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ColorProvider} from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revamp",
  description: "Generate Energy Efficient UIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="root">
      <body className={inter.className}>
        <ColorProvider>
          {children}
        </ColorProvider>
      </body>
    </html>
  );
}
