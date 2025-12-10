'use client';

import { Navbar, Footer, SmoothScrollProvider } from '@/components/layout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
