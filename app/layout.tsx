import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "Donut Browser - Anti-Detection Browser Manager",
  description: "Manage multiple browser profiles with advanced anti-fingerprinting and proxy configuration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.className} ${geistMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
