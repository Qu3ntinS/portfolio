import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Quentin Thees · Portfolio",
  description: "Full Stack Developer · Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans overflow-hidden h-screen`}
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        <ThemeProvider>
          <div className="global-grid" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
