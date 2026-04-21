'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/noi-dung', label: 'Trang Nội Dung' },
  { href: '/tham-gia', label: 'Tham Gia Quiz' },
  { href: '/noi-dung/mindmap', label: 'Mindmap' },
  { href: '/dashboard', label: 'Tạo Phòng' },
];

export default function LandingSwitchNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav
        className={`relative sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? 'border-mln-red/25 bg-black/80 backdrop-blur-xl shadow-[0_1px_0_rgba(239,68,68,0.12)]'
            : 'border-white/6 bg-black/30 backdrop-blur-lg'
        }`}
      >
        <div className="mln-top-bar" />

        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link
            href="/noi-dung"
            className="flex items-center gap-2 transition hover:opacity-85"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-mln-red/20 text-sm font-black text-mln-gold ring-1 ring-mln-red/30">
              ★
            </span>
            <span className="text-sm font-extrabold uppercase tracking-widest text-mln-cream">
              MLN122
            </span>
          </Link>

          {/* Desktop nav items */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/4 p-1">
              {ITEMS.slice(0, 2).map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition sm:px-4 ${
                      active
                        ? 'bg-linear-to-br from-mln-red to-mln-red-dark text-white shadow-md shadow-mln-red/30'
                        : 'text-mln-dim hover:bg-white/8 hover:text-mln-cream'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/noi-dung/mindmap"
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ml-1 ${
                pathname === '/noi-dung/mindmap'
                  ? 'border-mln-gold/50 bg-mln-gold/20 text-mln-gold'
                  : 'border-mln-gold/25 bg-mln-gold/10 text-mln-gold hover:bg-mln-gold/18'
              }`}
            >
              Mindmap
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-mln-red/25 transition hover:brightness-110 mx-1"
            >
              Tạo Phòng
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-mln-cream transition hover:bg-white/10 sm:hidden"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-mln-dark shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="relative flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="mln-top-bar" />
          <Link
            href="/noi-dung"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-mln-red/20 text-sm font-black text-mln-gold ring-1 ring-mln-red/30">
              ★
            </span>
            <span className="text-sm font-extrabold uppercase tracking-widest text-mln-cream">
              MLN122
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
            className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar nav links */}
        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-4">
          {ITEMS.map((item) => {
            const active = pathname === item.href;
            const isAction = item.href === '/dashboard';
            const isMindmap = item.href === '/noi-dung/mindmap';
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
                  isAction
                    ? 'bg-linear-to-br from-mln-red to-mln-red-dark text-white shadow-md shadow-mln-red/25'
                    : isMindmap
                      ? active
                        ? 'border border-mln-gold/50 bg-mln-gold/20 text-mln-gold'
                        : 'border border-mln-gold/25 bg-mln-gold/10 text-mln-gold hover:bg-mln-gold/18'
                      : active
                        ? 'bg-mln-red/15 text-mln-cream ring-1 ring-mln-red/30'
                        : 'text-mln-dim hover:bg-white/6 hover:text-mln-cream'
                }`}
              >
                <span className="text-[10px]">
                  {isAction ? '★' : isMindmap ? '◆' : active ? '▶' : '○'}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-white/8 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-mln-surface">
            Kinh Tế Chính Trị Mác-Lênin
          </p>
        </div>
      </aside>
    </>
  );
}
