import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo App',
  description: 'A minimal Next.js app for Claude Code workflow demos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
