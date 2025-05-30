import '../public/app.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js i18n App',
  description: 'Next.js App with i18n support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
