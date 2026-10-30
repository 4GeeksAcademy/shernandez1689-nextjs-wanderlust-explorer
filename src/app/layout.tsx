import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Geist } from "next/font/google";
import Navbar, { NavbarFallback } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/hooks/useFavorites";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wanderlust Explorer",
    template: "%s · Wanderlust Explorer",
  },
  description:
    "Descubre y guarda experiencias únicas alrededor del mundo: tours gastronómicos, rutas de vela, retiros de bienestar y mucho más.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <FavoritesProvider>
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
