import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlaygroundDrawer from '@/components/PlaygroundDrawer';
import { PlaygroundDrawerProvider } from '@/components/PlaygroundDrawerContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yoonshik Hong - Software Engineer',
  description: 'Personal website and app showcase of Yoonshik Hong',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlaygroundDrawerProvider>
          <Navigation />
          {children}
          <Footer />
          <PlaygroundDrawer />
        </PlaygroundDrawerProvider>
      </body>
    </html>
  );
}
