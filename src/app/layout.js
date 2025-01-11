import Tanstack from "@/components/common/Tanstack";
import Footer from "@/components/pages/shared/Footer/Footer";
import Header from "@/components/pages/shared/Header/Header";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/contexts/AuthProvider";
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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Tanstack>
            {/* header */}
            <Header />
            <main className="bg-muted">{children}</main>
            <Toaster />
            <SonnerToaster position="top-center" />
            {/* footer */}
            <Footer />
          </Tanstack>
        </AuthProvider>
      </body>
    </html>
  );
}
