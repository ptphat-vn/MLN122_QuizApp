import { OptionStat } from '@/types';
import { AnswerBar } from '@/components/host/AnswerBar';

interface LiveDashboardProps {
  stats: OptionStat[];
  totalAnswered: number;
  totalPlayers: number;
  revealed?: boolean;
}

export function LiveDashboard({
  stats,
  totalAnswered,
  totalPlayers,
  revealed,
}: LiveDashboardProps) {
  if (stats.length === 0) {
    return (
      <section className="glass-card grid min-h-56 place-items-center p-6 text-sm text-mln-dim">
        Chưa có dữ liệu trả lời.
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((item, index) => {
          const symbols = ['▲', '◆', '●', '■'];
          return (
            <AnswerBar
              key={item.optionId}
              color={item.color}
              label={symbols[index] || '•'}
              text={item.text}
              count={item.count}
              percentage={item.percentage}
              isCorrect={item.isCorrect}
              revealed={revealed}
            />
          );
        })}
      </div>
      <div className="inline-flex items-center gap-2 rounded-xl bg-white/4 px-4 py-2.5 text-sm text-mln-cream">
        <span className="size-2 rounded-full bg-mln-red animate-ping" />
        Đã nộp: <strong>{totalAnswered}</strong> / {totalPlayers} thí sinh
      </div>
    </section>
  );
}
