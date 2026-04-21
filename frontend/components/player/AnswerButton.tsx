'use client';

interface AnswerButtonProps {
  symbol: string;
  text: string;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function AnswerButton({
  symbol,
  text,
  color,
  onClick,
  disabled,
}: AnswerButtonProps) {
  const isAmber = color === '#f59e0b';
  const textColor = isAmber ? '#09090b' : '#ffffff';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="min-h-20 rounded-2xl px-5 py-4 text-left text-lg font-bold shadow-md transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:scale-100"
      style={{ backgroundColor: color, color: textColor }}
    >
      <span className="block text-xs font-semibold uppercase tracking-widest opacity-70">
        {symbol}
      </span>
      <span className="mt-1 block">{disabled ? '✓ Đã chọn' : text}</span>
    </button>
  );
}
