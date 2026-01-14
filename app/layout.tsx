import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Hughestown Self-Storage | Clean, Secure Storage in Hughestown, PA",
  description:
    "Hughestown Self-Storage offers clean, secure storage units with easy access in Hughestown, Pennsylvania. Reserve a unit online in minutes.",
  metadataBase: new URL("https://hughestownstorage.com"),
  alternates: { canonical: "https://hughestownstorage.com" },
  openGraph: {
    title: "Hughestown Self-Storage",
    description:
      "Clean, secure storage units with easy access in Hughestown, PA.",
    url: "https://hughestownstorage.com",
    siteName: "Hughestown Self-Storage",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO: replace with your exact address/phone/hours when ready
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "SelfStorage",
    name: "Hughestown Self-Storage",
    url: "https://hughestownstorage.com",
    telephone: "+1-570-880-0072",
    address: {
      "@type": "PostalAddress",
      streetAddress: "133 New Street",
      addressLocality: "Hughestown",
      addressRegion: "PA",
      postalCode: "18640",
      addressCountry: "US",
    },
    // set accurate openingHours when known, e.g. "Mo-Fr 09:00-17:00"
    openingHours: [],
    image: ["https://hughestownstorage.com/og-image.jpg"],
    sameAs: [],
  };

  return (
    <html lang="en">
      <head>
        <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
        <link rel="icon" href="/icon.png?v=2" sizes="any" />
      </head>
      <body>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
