import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nafiz Basher Alif - Political Science Researcher',
  description: 'Nafiz Basher Alif - Political Science Researcher',
  icons: {
    icon: '/images/nafiz2website.png',
    shortcut: '/images/nafiz2website.png',
    apple: '/images/nafiz2website.png',
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
