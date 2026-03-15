import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surge — Embedded BNPL for African Commerce",
  description:
    "Let your customers pay-small-small without leaving your store. Surge is Nigeria's embedded BNPL infrastructure — live in under 30 minutes.",
  openGraph: {
    title: "Surge",
    description: "Embedded BNPL for African Commerce",
    url: "https://gosurge.xyz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
