import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@/lib/progress";

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MarketPath — Learn Stocks & Crypto from Zero",
  description:
    "An interactive, beginner-friendly platform for learning stock market and cryptocurrency fundamentals: lessons, chart reading, simulations, quizzes and risk education. All data is illustrative — never live market prices.",
  keywords: [
    "learn investing",
    "stock market basics",
    "cryptocurrency for beginners",
    "financial literacy",
    "candlestick charts",
    "portfolio simulator",
  ],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ProgressProvider>
            {children}
            <Toaster />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
