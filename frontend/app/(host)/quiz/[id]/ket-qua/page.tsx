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
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-mln-dim transition hover:text-mln-cream"
      >
        ← Quay lại Dashboard
      </Link>

      <div className="glass-card p-7">
        <h1 className="text-2xl font-bold text-mln-cream">Kết quả kỳ thi</h1>
        <p className="mt-1 text-sm text-mln-dim">Mã bộ đề: {id}</p>

        {!sessionId && (
          <p className="mt-6 text-sm text-mln-dim">
            Không có sessionId. Hãy truy cập từ trang kết thúc game.
          </p>
        )}

        {sessionId && loading && (
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 animate-pulse rounded-xl bg-mln-surface/50"
              />
            ))}
          </div>
        )}

        {sessionId && !loading && results && (
          <div className="mt-6">
            <LeaderboardTable rankings={results.rankings} />
          </div>
        )}
      </div>
    </main>
  );
}
