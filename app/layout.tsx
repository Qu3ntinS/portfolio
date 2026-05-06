import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import ScrollTimeline from "./components/ScrollTimeline";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quentin's Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white transition-colors duration-300`}>
        <ThemeProvider>
          <div className="relative">
            <ScrollTimeline />
            <ParticleBackground />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
