import type { Metadata } from "next";
import FloatingSocials from "@/components/FloatingSocials";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homezy Realty | Luxury Real Estate in Nairobi",
  description: "Discover exceptional properties and investment opportunities with Nairobi's premier real estate agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <FloatingSocials />
      </body>
    </html>
  );
}