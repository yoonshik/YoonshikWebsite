import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App | Yoonshik Hong',
  description: 'Small apps and tools built by Yoonshik Hong',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
