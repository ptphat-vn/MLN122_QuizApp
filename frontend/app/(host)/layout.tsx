'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Navbar } from '@/components/shared/Navbar';
import { useAuthStore } from '@/stores/authStore';

interface HostLayoutProps {
  children: React.ReactNode;
}

export default function HostLayout({ children }: HostLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, hydrate } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      await hydrate();
      setLoading(false);
    };

    void run();
  }, [hydrate]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/dang-nhap');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-mln-dark">
        <div className="relative">
          <div
            className="absolute inset-0 animate-ping rounded-full bg-mln-red/20"
            style={{ animationDuration: '1.5s' }}
          />
          <span className="relative animate-star-pulse text-5xl text-mln-red">
            ★
          </span>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-mln-dim">MLN122</p>
          <p className="text-xs text-mln-surface mt-1">Đang tải hệ thống...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pb-6">
      <Navbar />
      {children}
    </div>
  );
}
