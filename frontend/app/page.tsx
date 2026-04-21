'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { toast } from 'sonner';

import { useSessionStore } from '@/stores/sessionStore';

function normalizePin(pin: string) {
  return pin.replace(/\D/g, '').slice(0, 6);
}

function JoinModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { getSessionByPin, loading } = useSessionStore();
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const backdropRef = useRef<HTMLDivElement>(null);

  const formattedPin = pin.replace(/(\d{3})(\d{0,3})/, '$1 $2').trim();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (pin.length < 6 || nickname.trim().length < 2) return;
    try {
      const session = await getSessionByPin(pin);
      if (session.status !== 'waiting') {
        toast.error('Phòng này đã bắt đầu hoặc đã kết thúc.');
        return;
      }
      router.push(
        `/phong/${pin}/cho?nickname=${encodeURIComponent(nickname.trim())}`,
      );
    } catch {
      toast.error('Phòng không tồn tại hoặc mã PIN không đúng.');
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-md animate-fade-in">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute -right-2 -top-2 z-10 flex size-7 items-center justify-center rounded-full border border-white/10 bg-mln-mid text-mln-dim/70 transition hover:bg-white/10 hover:text-mln-cream"
        >
          <X className="size-3.5" />
        </button>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-mln-mid to-mln-dark shadow-2xl shadow-black/60 ring-1 ring-mln-red/30">
          {/* Header */}
          <div className="border-b border-white/8 bg-gradient-to-r from-mln-red/20 to-transparent px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-mln-red/20 text-mln-gold text-lg">
                ★
              </span>
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-wider text-mln-cream">
                  Tham Gia Kỳ Thi
                </h2>
                <p className="text-xs text-mln-dim">
                  Nhập mã PIN để vào phòng thi
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <form className="space-y-5 px-6 py-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="modal-pin"
                className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-mln-dim"
              >
                <span className="text-mln-gold">◆</span> Mã PIN (6 số)
              </label>
              <input
                id="modal-pin"
                type="text"
                inputMode="numeric"
                value={formattedPin}
                onChange={(e) => setPin(normalizePin(e.target.value))}
                placeholder="123 456"
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-center font-mono text-3xl tracking-[0.25em] text-mln-cream outline-none transition duration-200 placeholder:text-mln-dim/50 focus:border-mln-red/60 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
              />
            </div>

            <div>
              <label
                htmlFor="modal-nickname"
                className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-mln-dim"
              >
                <span className="text-mln-gold">●</span> Tên hiển thị
              </label>
              <input
                id="modal-nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                maxLength={32}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition duration-200 placeholder:text-mln-dim/50 focus:border-mln-red/60 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 font-semibold text-mln-dim transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-mln-cream"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={
                  pin.length !== 6 || nickname.trim().length < 2 || loading
                }
                className="flex-[2] rounded-xl bg-gradient-to-br from-mln-red to-mln-red-dark py-3 font-semibold text-white shadow-lg shadow-mln-red/25 transition duration-200 hover:brightness-110 hover:shadow-mln-red/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? 'Đang kiểm tra…' : '★ Vào Phòng Thi'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: '★',
    title: 'Tham Gia Tức Thì',
    desc: 'Vào phòng thi bằng Mã PIN hoặc QR chỉ trong vài giây, tối ưu cho mobile.',
  },
  {
    icon: '◆',
    title: 'Bảng Danh Dự Realtime',
    desc: 'Điểm tích lũy và thứ hạng cập nhật tức thời sau mỗi câu hỏi.',
  },
  {
    icon: '●',
    title: 'Chuẩn Chương Trình MLN122',
    desc: 'Bộ câu hỏi bám sát giáo trình Kinh Tế Chính Trị Mác-Lênin chuẩn đại học.',
  },
];

export default function Home() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mln-red/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 size-64 translate-x-1/2 translate-y-1/2 rounded-full bg-mln-gold/6 blur-3xl" />
        </div>

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-mln-red/30 bg-mln-red/10 px-4 py-1.5 text-xs font-semibold text-mln-red">
            <span className="animate-star-pulse">★</span>
            Kiểm toàn chương trình MLN122
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
              <span className="gradient-text">Kinh Tế Chính Trị</span>
              <br />
              <span className="text-mln-cream">Mác-Lênin</span>
            </h1>
            <p className="text-lg text-mln-dim">
              Ôn tập &mdash; Kiểm tra &mdash; Tranh luận
              <br />
              <span className="text-mln-gold italic">
                &ldquo;Học, học nữa, học mãi.&rdquo; &mdash; V.I. Lê-nin
              </span>
            </p>
          </div>

          {/* Divider */}
          <hr className="mln-divider w-full max-w-xs" />

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dang-nhap"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-8 py-3.5 font-semibold text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110 hover:shadow-mln-red/40"
            >
              ★ Tạo Bộ Đề Ngay
            </Link>
            <button
              type="button"
              onClick={() => setJoinOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-8 py-3.5 font-semibold text-mln-cream backdrop-blur-sm transition hover:bg-white/10"
            >
              → Tham Gia Kỳ Thi
            </button>
          </div>

          {/* Feature cards */}
          <section className="mt-4 grid w-full gap-4 md:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="glass-card p-5 text-left transition hover:border-mln-red/20 hover:bg-white/6"
              >
                <span className="mb-3 block text-2xl text-mln-gold">
                  {f.icon}
                </span>
                <h2 className="font-semibold text-mln-cream">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mln-dim">
                  {f.desc}
                </p>
              </article>
            ))}
          </section>
        </div>
      </section>

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}

      {/* Footer */}
      <footer className="border-t border-white/6 bg-mln-dark/80 py-4 text-center text-xs text-mln-dim backdrop-blur-xl">
        MLN122 — Hệ thống ôn tập Kinh Tế Chính Trị Mác-Lênin
      </footer>
    </main>
  );
}
