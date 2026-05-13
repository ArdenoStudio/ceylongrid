import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CeylonGrid — Sri Lanka Intelligence Dashboard",
  description:
    "Real-time national intelligence dashboard. Every significant thing happening in Sri Lanka — economic, political, environmental, infrastructural — on one platform.",
  keywords: ["Sri Lanka", "news", "live feed", "economy", "dashboard", "intelligence"],
  openGraph: {
    title: "CeylonGrid",
    description: "Sri Lanka's national intelligence dashboard",
    siteName: "CeylonGrid",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
