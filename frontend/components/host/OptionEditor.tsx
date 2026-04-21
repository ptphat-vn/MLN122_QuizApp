import { Option } from '@/types';

interface OptionEditorProps {
  option: Option;
  label: string;
  checked: boolean;
  onToggle: () => void;
  onTextChange?: (text: string) => void;
}

export function OptionEditor({
  option,
  label,
  checked,
  onToggle,
  onTextChange,
}: OptionEditorProps) {
  return (
    <label
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/4 p-3 transition hover:bg-white/7"
      style={{ borderLeftWidth: '3px', borderLeftColor: option.color }}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
        style={{ backgroundColor: option.color }}
      >
        {label}
      </span>
      <input
        value={option.text}
        onChange={(e) => onTextChange?.(e.target.value)}
        readOnly={!onTextChange}
        placeholder="Nhập đáp án..."
        className="flex-1 bg-transparent text-sm text-mln-cream outline-none placeholder:text-mln-dim/50"
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="size-4 accent-mln-red"
      />
    </label>
  );
}
