import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin", 'latin-ext'],
  weight: ['100','200','300','400','500','600','700','800','900']
});

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculator to check your BMI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`${montserrat.className}`, "dark")}
      >
        {children}
      </body>
    </html>
  );
}
