interface QuestionDisplayProps {
  question: string;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <section className="glass-card overflow-hidden">
      <div className="h-1 w-full bg-linear-to-r from-mln-red to-mln-gold" />
      <div className="p-6 text-center">
        <span className="rounded-full bg-mln-red/15 px-3 py-1 text-xs font-semibold text-mln-red">
          Câu hỏi
        </span>
        <h1 className="mt-4 text-2xl font-bold text-mln-cream md:text-3xl">
          {question}
        </h1>
        <p className="mt-3 text-sm text-mln-dim">
          Chọn phương án trong thời gian quy định.
        </p>
      </div>
    </section>
  );
}
