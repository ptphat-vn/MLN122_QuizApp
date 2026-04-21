'use client';

import Link from 'next/link';
import { use, useEffect } from 'react';

import { LeaderboardTable } from '@/components/host/LeaderboardTable';
import { useSessionStore } from '@/stores/sessionStore';
import { useGameStore } from '@/stores/gameStore';
import { Ranking } from '@/types';

interface RoomEndPageProps {
  params: Promise<{ roomCode: string }>;
  searchParams: Promise<{ mode?: string; sessionId?: string }>;
}

const PODIUM_CONFIG = [
  {
    medal: '🥈',
    heightClass: 'h-36',
    ring: 'ring-1 ring-white/20',
    bg: 'bg-gradient-to-b from-white/8 to-white/3',
    label: '2ND',
  },
  {
    medal: '🥇',
    heightClass: 'h-52',
    ring: 'ring-2 ring-mln-gold/60',
    bg: 'bg-gradient-to-b from-mln-gold/20 to-mln-gold/5',
    label: '1ST',
  },
  {
    medal: '🥉',
    heightClass: 'h-28',
    ring: 'ring-1 ring-orange-400/30',
    bg: 'bg-gradient-to-b from-orange-400/10 to-orange-400/3',
    label: '3RD',
  },
];

function Podium({ rankings }: { rankings: Ranking[] }) {
  const slots = [rankings[1], rankings[0], rankings[2]];

  return (
    <div className="flex items-end justify-center gap-3">
      {slots.map((player, colIndex) => {
        const cfg = PODIUM_CONFIG[colIndex];
        return (
          <div
            key={player?.nickname ?? `empty-${colIndex}`}
            className={`flex w-28 flex-col items-center justify-end rounded-2xl p-4 pb-5 text-center shadow-lg ${cfg.heightClass} ${cfg.ring} ${cfg.bg}`}
          >
            {player ? (
              <>
                <span className="text-3xl leading-none">{cfg.medal}</span>
                <p className="mt-2 max-w-full truncate text-xs font-bold text-mln-cream">
                  {player.nickname}
                </p>
                <p className="mt-1 font-mono text-sm font-extrabold text-mln-gold">
                  {player.score.toLocaleString()}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-mln-dim">
                  {cfg.label}
                </p>
              </>
            ) : (
              <p className="text-xs text-mln-dim/40">{cfg.label}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EndPageShell({
  title,
  subtitle,
  rankings,
  actions,
  loading,
}: {
  title: string;
  subtitle?: string;
  rankings: Ranking[];
  actions: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <main className="relative mx-auto flex min-h-screen w-[min(960px,calc(100%-2rem))] flex-col justify-center gap-8 py-12">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mln-gold/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 size-64 rounded-full bg-mln-red/8 blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center animate-fade-in">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mln-gold/30 bg-mln-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-mln-gold">
          <span className="animate-star-pulse">★</span>
          MLN122 — Kết thúc kỳ thi
        </div>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-mln-cream lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-mln-dim">{subtitle}</p>}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-mln-mid/60"
            />
          ))}
        </div>
      ) : rankings.length > 0 ? (
        <>
          {/* Podium */}
          <section className="animate-fade-in">
            <Podium rankings={rankings} />
          </section>

          {/* Full leaderboard */}
          <section className="animate-fade-in">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-mln-dim">
              Bảng xếp hạng đầy đủ
            </p>
            <LeaderboardTable rankings={rankings} />
          </section>
        </>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 grid min-h-40 place-items-center p-8 text-center">
          <div className="mln-top-bar" />
          <div>
            <p className="text-3xl text-mln-gold">★</p>
            <p className="mt-2 text-mln-dim">Chưa có dữ liệu xếp hạng.</p>
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
        {actions}
      </div>
    </main>
  );
}

function HostEndRoom({ sessionId }: { sessionId: string }) {
  const { results, loading, getSessionResults } = useSessionStore();

  useEffect(() => {
    if (sessionId) void getSessionResults(sessionId);
  }, [sessionId, getSessionResults]);

  return (
    <EndPageShell
      title="Kết Quả Chung Cuộc"
      subtitle="Chúc mừng các thí sinh xuất sắc nhất kỳ thi."
      rankings={results?.rankings ?? []}
      loading={loading}
      actions={
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-6 py-3 font-bold uppercase tracking-widest text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110"
        >
          ★ Về bảng điều khiển
        </Link>
      }
    />
  );
}

function PlayerEndRoom() {
  const { leaderboard } = useGameStore();

  return (
    <EndPageShell
      title="Kết Quả Chung Cuộc"
      subtitle="Cảm ơn bạn đã tham gia kỳ thi MLN122!"
      rankings={leaderboard}
      actions={
        <>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold uppercase tracking-wide text-mln-cream transition hover:bg-white/10"
          >
            → Về trang chủ
          </Link>
          <Link
            href="/tham-gia"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-6 py-3 font-bold uppercase tracking-widest text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110"
          >
            ★ Thi lại
          </Link>
        </>
      }
    />
  );
}

export default function RoomEndPage({ searchParams }: RoomEndPageProps) {
  const { mode, sessionId = '' } = use(searchParams);
  const isHost = mode === 'host';

  if (isHost) return <HostEndRoom sessionId={sessionId} />;
  return <PlayerEndRoom />;
}
