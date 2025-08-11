import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MWSearch - Real-Time Web Search API",
  description:
    "MWSearch provides a powerful API for real-time web search, allowing you to search the public web or specific sites with fine-tuned parameters like language, freshness, and result count.",
  keywords: [
    "MWSearch",
    "MWSearch API",
    "Real-Time Web Search",
    "Web Search API",
    "Search API",
  ],
  openGraph: {
    type: "website",
    siteName: "MWSearch",
    locale: "en_US",
    url: "https://mwsearch-landing-local.vercel.app",
    title: "MWSearch - Real-Time Web Search API",
    description:
      "MWSearch provides a powerful API for real-time web search, allowing you to search the public web or specific sites with fine-tuned parameters like language, freshness, and result count.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MWSearch Preview",
      },
    ],
  },
  authors: [
    {
      name: "Emirhan Durmuş",
      url: "https://github.com/emirhandrms",
    },
  ],
  creator: "Emirhan Durmuş",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
