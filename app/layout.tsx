import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XoXoCafe — Book a Table",
  description: "Reserve your table at XoXoCafe. Secure your spot with a deposit — refundable up to 24 hours before your booking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
