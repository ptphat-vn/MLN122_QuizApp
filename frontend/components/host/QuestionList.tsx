import { Question } from '@/types';

interface QuestionListProps {
  title: string;
  quizId: string;
  questions: Question[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
}

export function QuestionList({
  title,
  quizId,
  questions,
  activeIndex,
  onSelect,
  onAdd,
}: QuestionListProps) {
  return (
    <aside className="glass-card flex flex-col p-4">
      <h2 className="font-semibold text-mln-cream">{title}</h2>
      <p className="mt-0.5 text-xs text-mln-dim/60">ID: {quizId}</p>

      <div className="mt-3 max-h-[55vh] flex-1 space-y-1 overflow-auto pr-1">
        {questions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 p-3 text-center text-sm text-mln-dim">
            Chưa có câu hỏi.
          </p>
        ) : (
          questions.map((question, index) => (
            <button
              key={question._id}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                index === activeIndex
                  ? 'bg-mln-red/80 font-semibold text-white'
                  : 'text-mln-dim hover:bg-white/6 hover:text-mln-cream'
              }`}
            >
              <span className="opacity-60">#{index + 1}</span>{' '}
              {question.content.slice(0, 32)}
              {question.content.length > 32 ? '…' : ''}
            </button>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-3 w-full rounded-xl border border-white/10 bg-white/4 px-3 py-2.5 text-sm font-medium text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
      >
        + Thêm câu hỏi
      </button>
    </aside>
  );
}
