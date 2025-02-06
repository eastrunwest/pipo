
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { Theme } from "@radix-ui/themes";
import ThemeObserver from "@/components/ThemeObserver";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PIPO",
  description: "真相只有一个",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-red-500`}>
        <NextAuthProvider>
          <Theme>
            <div className="flex min-h-screen">
              <DesktopNav />
              <main className="flex-1">
                {children}
              </main>
            </div>
            <MobileNav />
          </Theme>
        </NextAuthProvider>
        <ThemeObserver />
      </body>
    </html>
  );
}