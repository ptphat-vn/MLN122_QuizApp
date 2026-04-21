interface AnswerBarProps {
  color: string;
  label: string;
  text: string;
  count: number;
  percentage: number;
  isCorrect?: boolean;
  revealed?: boolean;
}

export function AnswerBar({
  color,
  label,
  text,
  count,
  percentage,
  isCorrect,
  revealed,
}: AnswerBarProps) {
  const showResult = revealed && isCorrect !== undefined;

  return (
    <article
      className={`glass-card flex flex-col overflow-hidden transition-all duration-300 ${
        showResult && isCorrect
          ? 'ring-2 ring-green-400/70 shadow-lg shadow-green-400/20'
          : showResult && !isCorrect
            ? 'opacity-50'
            : ''
      }`}
    >
      {/* color top stripe */}
      <div className="h-1 w-full" style={{ backgroundColor: color }} />
      <div className="flex flex-1 flex-col justify-end p-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-mln-dim line-clamp-1">
          {showResult && isCorrect && (
            <span className="text-green-400 font-bold">✓</span>
          )}
          {showResult && !isCorrect && (
            <span className="text-red-400 font-bold">×</span>
          )}
          {label} — {text}
        </div>
        {/* bar chart */}
        <div className="relative h-24 overflow-hidden rounded-lg bg-mln-dark/60">
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-500"
            style={{
              height: `${percentage}%`,
              backgroundColor: showResult && isCorrect ? '#4ade80' : color,
              opacity: 0.85,
            }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-mln-cream">
            {count} người
          </span>
          <span className="text-xs text-mln-dim">{percentage}%</span>
        </div>
      </div>
    </article>
  );
}
