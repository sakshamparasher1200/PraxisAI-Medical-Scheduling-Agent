import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Praxis | AI Medical Scheduling",
  description: "Automated patient booking and scheduling system for medical practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, "min-h-screen bg-[#0a041c] text-white antialiased")}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="py-6 text-center text-sm text-gray-400">
            <div className="container mx-auto">
              <p>© {new Date().getFullYear()} Praxis. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
