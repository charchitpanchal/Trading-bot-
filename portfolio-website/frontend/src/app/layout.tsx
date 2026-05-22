import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CHARCHIT PANCHAL | Python Developer & Future Software Engineer",
  description:
    "Portfolio of CHARCHIT PANCHAL — Python Developer, AI & ML Learner, and aspiring Software Engineer. Projects, skills, and contact.",
  keywords: [
    "CHARCHIT PANCHAL",
    "Python Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Machine Learning",
  ],
  authors: [{ name: "CHARCHIT PANCHAL" }],
  openGraph: {
    title: "CHARCHIT PANCHAL — Developer Portfolio",
    description: "Python Developer | AI & ML Learner | Future Software Engineer",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
