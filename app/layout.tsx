import "./globals.css";
import type { Metadata } from "next";
import { AppProvider } from "@/context/app-context";

export const metadata: Metadata = {
  title: "Liquid",
  description: "Where Indigenous Traditions Flow into Fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
