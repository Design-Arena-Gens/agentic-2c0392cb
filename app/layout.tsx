import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube Channel Blueprint",
  description: "Launch-ready content ideas, branding angles, and growth plan for your YouTube channel.",
  metadataBase: new URL("https://agentic-2c0392cb.vercel.app"),
  openGraph: {
    title: "YouTube Channel Blueprint",
    description: "Craft your channel identity and a full month of video ideas in minutes.",
    url: "https://agentic-2c0392cb.vercel.app",
    siteName: "YouTube Channel Blueprint",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Channel Blueprint",
    description: "Craft your channel identity and a full month of video ideas in minutes.",
    creator: "@agentic"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
