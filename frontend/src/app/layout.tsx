import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrueArt AI Checker | Detect AI-Generated Images",
  description:
    "Upload an image and get a simple AI-generated vs real-image prediction with a clean, fast checker built for quick verification.",
  keywords: [
    "AI image detector",
    "AI checker",
    "image authenticity checker",
    "detect AI-generated images",
    "real vs AI image",
  ],
  applicationName: "TrueArt AI Checker",
  category: "technology",
  openGraph: {
    title: "TrueArt AI Checker",
    description:
      "A minimal image checker for identifying likely AI-generated images.",
    siteName: "TrueArt AI Checker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueArt AI Checker",
    description:
      "Upload an image and check whether it is likely AI-generated.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
