import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BudgetProvider } from "./context/BudgetContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenses Control",
  description: "Keep track of your expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100`}>
        <BudgetProvider> {children}</BudgetProvider>
      </body>
    </html>
  );
}
