import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Ruanggulik - Tech Blog",
  description: "A Neo-Brutalism Tech Blog powered by Next.js and Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${notoSans.variable} ${jetbrainsMono.variable} bg-grid-pattern text-white font-display overflow-x-hidden selection:bg-accent selection:text-black`}
      >
        <div className="flex min-h-screen flex-col relative">
           {children}
        </div>
      </body>
    </html>
  );
}
