import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rainmaker AI",
  description: "Get ahead.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
