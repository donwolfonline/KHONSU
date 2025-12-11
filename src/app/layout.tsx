import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto, Poppins, Montserrat, Playfair_Display, Lora, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khonsu - Your Digital Presence Under the Moon",
  description: "Connect your digital universe. Share your presence, stories, and creativity in one mystical, personalized page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} ${playfairDisplay.variable} ${lora.variable} ${cinzel.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
