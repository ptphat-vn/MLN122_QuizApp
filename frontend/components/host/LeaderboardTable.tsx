import { Ranking } from '@/types';

interface LeaderboardTableProps {
  rankings: Ranking[];
}

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_GLOW = [
  'shadow-mln-gold/30 ring-mln-gold/40',
  'shadow-white/10 ring-white/20',
  'shadow-orange-400/20 ring-orange-400/30',
];
const RANK_BG = [
  'bg-gradient-to-r from-mln-gold/20 to-mln-gold/5 border border-mln-gold/30',
  'bg-gradient-to-r from-white/10 to-white/3 border border-white/15',
  'bg-gradient-to-r from-orange-400/15 to-orange-400/3 border border-orange-400/20',
];

export function LeaderboardTable({ rankings }: LeaderboardTableProps) {
  if (rankings.length === 0) {
    return (
      <section className="glass-card grid min-h-32 place-items-center p-6 text-sm text-mln-dim">
        Chưa có dữ liệu xếp hạng.
      </section>
    );
  }

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <section className="space-y-4">
      {/* Podium — top 3 */}
      <div className="grid gap-3 sm:grid-cols-3">
        {top3.map((item) => {
          const i = item.rank - 1;
          return (
            <div
              key={`${item.rank}-${item.nickname}`}
              className={`flex flex-col items-center gap-2 rounded-2xl p-5 shadow-lg ring-1 transition ${RANK_BG[i]} ${RANK_GLOW[i]}`}
            >
              <span className="text-3xl leading-none">{MEDALS[i]}</span>
              <span className="max-w-full truncate text-sm font-bold text-mln-cream">
                {item.nickname}
              </span>
              <span className="font-mono text-2xl font-extrabold text-mln-gold">
                {item.score.toLocaleString()}
              </span>
              {item.delta !== undefined && item.delta > 0 && (
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400">
                  +{item.delta}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Rest of rankings */}
      {rest.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-mln-mid/50">
          {rest.map((item, idx) => (
            <div
              key={`${item.rank}-${item.nickname}`}
              className={`grid grid-cols-[48px_1fr_auto] items-center gap-3 px-4 py-3 text-sm transition hover:bg-white/4 ${idx !== rest.length - 1 ? 'border-b border-white/6' : ''}`}
            >
              <span className="text-center font-mono text-xs font-bold text-mln-dim">
                #{item.rank}
              </span>
              <span className="truncate font-medium text-mln-cream">
                {item.nickname}
              </span>
              <div className="flex items-center gap-2">
                {item.delta !== undefined && item.delta > 0 && (
                  <span className="text-xs font-semibold text-green-400">
                    +{item.delta}
                  </span>
                )}
                <span className="font-mono font-semibold text-mln-gold">
                  {item.score.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
