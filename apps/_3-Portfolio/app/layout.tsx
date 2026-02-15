import type { Metadata } from 'next';
import './globals.css';
import { ShadcnThemeProvider } from '@repo/ui-shadcn';

export const metadata: Metadata = {
  title: 'Mehdi | Senior Full-Stack Developer',
  description: 'Senior Full-Stack Developer specializing in scalable backend systems, modern frontend frameworks, and clean architecture.',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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

