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
    <header className="relative sticky top-0 z-50 flex items-center justify-between border-b border-white/6 bg-mln-dark/85 px-6 py-3 backdrop-blur-xl shadow-[0_1px_0_rgba(239,68,68,0.1)]">
      {/* Red-gold-red top accent line */}
      <div className="mln-top-bar" />

      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 transition hover:opacity-85"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-mln-red/20 text-sm font-black text-mln-gold ring-1 ring-mln-red/35 shadow-md shadow-mln-red/15">
          ★
        </span>
        <div>
          <span className="block text-xs font-extrabold uppercase tracking-widest text-mln-cream leading-none">
            MLN122
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-mln-dim leading-none mt-0.5">
            Giảng Viên
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {user?.name ? (
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-green-400/80" />
            <p className="text-xs font-semibold text-mln-dim">{user.name}</p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm font-medium text-mln-dim transition hover:border-mln-red/30 hover:bg-mln-red/8 hover:text-mln-red-light"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
}
