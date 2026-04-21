'use client';

import Link from 'next/link';
import { use, useEffect } from 'react';

import { LeaderboardTable } from '@/components/host/LeaderboardTable';
import { useSessionStore } from '@/stores/sessionStore';

interface QuizResultPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sessionId?: string }>;
}

export default function QuizResultPage({
  params,
  searchParams,
}: QuizResultPageProps) {
  const { id } = use(params);
  const { sessionId } = use(searchParams);
  const { results, loading, getSessionResults } = useSessionStore();

  useEffect(() => {
    if (sessionId) void getSessionResults(sessionId);
  }, [sessionId, getSessionResults]);

  return (
    <main className="mx-auto mt-8 w-[min(900px,calc(100%-2rem))]">
      {/* Back */}
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mln-dim transition hover:text-mln-cream"
      >
        ← Dashboard
      </Link>

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 shadow-xl">
        <div className="mln-top-bar" />
        <div className="border-b border-white/8 bg-linear-to-r from-mln-gold/10 to-transparent px-7 py-5">
          <div className="mln-ink-badge mb-2">★ Kết quả kỳ thi</div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-mln-cream">
            Kết quả kỳ thi
          </h1>
          <p className="mt-1 text-xs text-mln-dim">
            Mã bộ đề: <span className="font-mono text-mln-cream/60">{id}</span>
          </p>
        </div>

        <div className="px-7 py-7">
          {!sessionId && (
            <p className="text-sm text-mln-dim">
              Không có sessionId. Hãy truy cập từ trang kết thúc game.
            </p>
          )}

          {sessionId && loading && (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded-xl bg-mln-surface/50"
                />
              ))}
            </div>
          )}

          {sessionId && !loading && results && (
            <div className="mt-2">
              <LeaderboardTable rankings={results.rankings} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
