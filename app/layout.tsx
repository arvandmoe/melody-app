import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import clsx from "clsx";
import { Sidebar } from "@/src/shared/components/layout/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melody App",
  description: "Listen to music on Melody App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <Providers>
          <div className="hidden md:block h-full">
            <div className="border-t h-full">
              <div className="bg-background h-full">
                <div className="grid lg:grid-cols-5 h-full">
                  <Sidebar className="hidden lg:block" />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
