import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bush Man — Modern Safari Field Goods",
  description: "Contemporary safari clothing, footwear and field essentials for men and women. Designed in Cape Town.",
  icons: { icon: "/bushman-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
