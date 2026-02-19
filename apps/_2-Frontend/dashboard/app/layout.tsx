import type { Metadata } from "next";
import { ShadcnThemeProvider } from "@repo/ui-shadcn";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard app with shared Tailwind, ESLint, TypeScript and shadcn/ui setup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ShadcnThemeProvider>{children}</ShadcnThemeProvider>
      </body>
    </html>
  );
}
