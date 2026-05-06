import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Dev Archipelago | 3D Interactive Learning Journey",
  description: "Explore the digital ocean of knowledge. An immersive 3D learning roadmap for Web, Android, Unity, and AI development.",
  keywords: ["learning roadmap", "3D web", "react three fiber", "nextjs", "software development", "web development roadmap"],
  authors: [{ name: "Dev Archipelago Team" }],
  openGraph: {
    title: "Dev Archipelago | 3D Interactive Learning Journey",
    description: "Explore the digital ocean of knowledge. An immersive 3D learning roadmap.",
    type: "website",
    url: "https://dev-archipelago.vercel.app",
    siteName: "Dev Archipelago",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Archipelago | 3D Interactive Learning Journey",
    description: "Explore the digital ocean of knowledge. An immersive 3D learning roadmap.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
