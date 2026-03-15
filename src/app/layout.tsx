import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flex Connect — Embedded BNPL for African Commerce",
  description:
    "Let your customers pay in installments without leaving your store. Flex Connect is the easiest way to embed BNPL into any website.",
  openGraph: {
    title: "Flex Connect",
    description: "Embedded BNPL for African Commerce",
    url: "https://demo.gosurge.xyz",
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
