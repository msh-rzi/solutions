import type { Metadata } from 'next';
import { UiMantineProvider } from '@repo/ui-mantine';
import './globals.css';

export const metadata: Metadata = {
  title: 'Form Permissions & Filters Core',
  description: 'Enterprise-grade form complexity with declarative schema-driven approach',
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
        <UiMantineProvider>{children}</UiMantineProvider>
      </body>
    </html>
  );
}

