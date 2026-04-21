'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { useAuthStore } from '@/stores/authStore';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/dang-nhap');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/6 bg-mln-dark/80 px-6 py-3 backdrop-blur-xl">
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 transition hover:opacity-80"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-mln-red to-mln-red-dark text-sm font-bold text-white shadow-md shadow-mln-red/30">
          ★
        </span>
        <span className="font-bold tracking-wide text-mln-cream">MLN122</span>
      </Link>

      <div className="flex items-center gap-3">
        {user?.name ? (
          <p className="hidden text-sm text-mln-dim sm:block">{user.name}</p>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm font-medium text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
}
